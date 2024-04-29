import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";
import _ from "lodash";

import { get, post } from "#/axios";
import { getSocket } from "#/socket";

import { GlobalContext } from "#/contexts/GlobalContext";
import { SocketContext } from "#/contexts/SocketContext";

import { emailRegex } from "../Form/validatePattern";
import UserSearched from "./SearchResult";
import ModalUser from "./ModalUser";
import ConversationList from "./ConversationList";
import ModalSearchUser from "./ModalSearchUser";

import { VIEW_CONSTANT } from "./Constant";
import ContactManagement from "./ContactManagement";

const AppLayout = () => {
  const navigate = useNavigate();
  const {
    isOpen: isModalUserOpen,
    onOpen: onOpenModalUser,
    onClose: onCloseModalUser,
  } = useDisclosure();
  const {
    isOpen: isModalSearchUserOpen,
    onOpen: onOpenModalSearchUser,
    onClose: onCloseModalSearchUser,
  } = useDisclosure();

  const { user, setUser, setConversationId, logOut } =
    useContext(GlobalContext);
  const { setSocket } = useContext(SocketContext);
  const searchRef = useRef(null);

  const [viewName, setViewName] = useState(VIEW_CONSTANT.CHAT);
  const [isSearch, setSearch] = useState(false);
  const [listUser, setListUser] = useState([]);

  // call api get data
  useEffect(() => {
    try {
      const getData = async () => {
        const me = await get("/users/me");

        if (me?.status === 200) {
          setUser(me?.data);
        }
      };

      getData();
    } catch (error) {}
  }, [setUser]);

  // connect with root socket
  useEffect(() => {
    const rootSocket = getSocket("", { autoConnect: false });

    if (!_.isEmpty(user)) {
      rootSocket.connect();
      setSocket((prev) => {
        const socket = _.cloneDeep(prev);

        return {
          ...socket,
          rootSocket,
        };
      });
    }

    return () => {
      rootSocket.disconnect();
    };
  }, [user, setSocket]);

  const handleLiveSearch = (event) => {
    const { value } = event?.target;

    if (!value.trim()) return;

    const isEmail = emailRegex.test(value);

    if (isEmail) {
      get(`/users?email=${value}`)
        .then((res) => {
          if (!_.isEmpty(res.data)) setListUser([res.data]);
        })
        .catch((error) => {});

      return;
    }

    return;
  };

  const handleClickUserSearched = useCallback(
    async (user) => {
      if (_.isEmpty(user)) return;

      try {
        const response = await post("/conversations", {
          participantId: user?.id,
        });

        if (response?.status === 201)
          return setConversationId(response?.data?.id);
      } catch (error) {}
    },
    [setConversationId]
  );

  const handleClickUserInfo = () => {
    onOpenModalUser();
  };

  const handleLogout = () => {
    logOut();
    return navigate("/login");
  };

  const debounceLiveSearch = _.debounce(handleLiveSearch, 300);

  const renderMainSidebar = useMemo(() => {
    const viewByPath = {
      [VIEW_CONSTANT.CHAT]: () => <ConversationList />,
      [VIEW_CONSTANT.CONTACT]: () => <ContactManagement />,
    };

    return (
      <>
        {isSearch ? (
          <Box flex={1} overflowY="scroll">
            {listUser &&
              listUser?.map((user, index) => (
                <UserSearched
                  key={index}
                  user={user}
                  onClick={handleClickUserSearched}
                />
              ))}
          </Box>
        ) : (
          <>{viewByPath[viewName]()}</>
        )}
      </>
    );
  }, [viewName, isSearch, listUser, handleClickUserSearched]);

  return (
    <>
      {_.isEmpty(user) ? (
        <Box height="100%" display="flex">
          <Spinner margin="auto" size="xl" color="teal.500" />
        </Box>
      ) : (
        <>
          <Flex height="100%">
            <Stack
              width={"60px"}
              alignItems="center"
              gap={3}
              padding="10px 5px"
              border="1px solid #e5e5e5"
            >
              <Box>
                <Menu placement="right-end">
                  <MenuButton>
                    <Avatar
                      src={user?.photoUrl ? user.photoUrl : ""}
                      _hover={{ cursor: "pointer" }}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      icon={<Icon icon="mingcute:user-info-fill" />}
                      onClick={handleClickUserInfo}
                    >
                      User Information
                    </MenuItem>
                    <MenuItem
                      icon={<Icon icon="material-symbols:logout" />}
                      color="red.500"
                      onClick={handleLogout}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box
                width="100%"
                aspectRatio={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="10px"
                _hover={{
                  cursor: "pointer",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                }}
                onClick={() => {
                  navigate("/");
                  setViewName(VIEW_CONSTANT.CHAT);
                }}
              >
                <Icon
                  style={{ fontSize: "36px" }}
                  icon={
                    viewName === VIEW_CONSTANT.CHAT
                      ? "mdi:chat"
                      : "mdi:chat-outline"
                  }
                />
              </Box>
              <Box
                width="100%"
                aspectRatio={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="10px"
                _hover={{
                  cursor: "pointer",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                }}
                onClick={() => {
                  navigate("/contact");
                  setViewName(VIEW_CONSTANT.CONTACT);
                }}
              >
                <Icon
                  style={{ fontSize: "36px" }}
                  icon={
                    viewName === VIEW_CONSTANT.CONTACT
                      ? "fluent:book-contacts-32-filled"
                      : "fluent:book-contacts-32-regular"
                  }
                />
              </Box>
            </Stack>
            <Stack width={"360px"} border="1px solid #e5e5e5">
              <Box
                paddingX="10px"
                paddingY="5px"
                borderBottom="1px solid #e5e5e5"
              >
                <Heading size="lg">Chat</Heading>
                <Flex alignItems="center" gap={2}>
                  <Flex alignItems="center" flex={1}>
                    {isSearch && (
                      <Box
                        height="30px"
                        marginRight="10px"
                        aspectRatio={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="20px"
                        borderRadius="100%"
                        _hover={{
                          cursor: "pointer",
                          backgroundColor: "rgba(0, 0, 0, 0.05)",
                        }}
                        onClick={() => {
                          searchRef.current.value = "";
                          setSearch(false);
                          setListUser([]);
                        }}
                      >
                        <Icon icon="ion:arrow-back" />
                      </Box>
                    )}
                    <Input
                      ref={searchRef}
                      my="10px"
                      placeholder="Search"
                      onFocus={() => setSearch(true)}
                      onChange={debounceLiveSearch}
                    />
                  </Flex>
                  <Box>
                    <IconButton
                      variant="ghost"
                      icon={
                        <Icon
                          style={{ fontSize: "24px" }}
                          icon="iconoir:user-plus"
                        />
                      }
                      onClick={onOpenModalSearchUser}
                    />
                  </Box>
                </Flex>
              </Box>
              {renderMainSidebar}
            </Stack>
            <Box flex={1}>
              <Outlet />
            </Box>
          </Flex>

          {/* Render ModalUser here */}
          <ModalUser
            user={user}
            isOpen={isModalUserOpen}
            onClose={onCloseModalUser}
          />

          {/* Render ModalSearchUser here */}
          <ModalSearchUser
            isOpen={isModalSearchUserOpen}
            onClose={onCloseModalSearchUser}
          />
        </>
      )}
    </>
  );
};

export default AppLayout;
