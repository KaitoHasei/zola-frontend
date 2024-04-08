import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Outlet } from "react-router-dom";
import { Box, Heading, Input, Spinner } from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";
import _ from "lodash";

import { get, post } from "#/axios";
import { getSocket } from "#/socket";

import { GlobalContext } from "#/contexts/GlobalContext";
import { SocketContext } from "#/contexts/SocketContext";

import UserSearched from "./SearchResult";
import ConversationList from "./ConversationList";

const AppLayout = () => {
  const { user, setUser, setConversationId } = useContext(GlobalContext);
  const { setSocket } = useContext(SocketContext);
  const searchRef = useRef(null);
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

    get(`/users?email=${value}`)
      .then((res) => {
        setListUser(res?.data?.list);
      })
      .catch((error) => {});
  };

  const handleClickUserSearched = useCallback(
    async (user) => {
      if (_.isEmpty(user)) return;

      try {
        const response = await post("/conversations", {
          participantIds: [user?.id],
        });

        if (response?.status === 201)
          return setConversationId(response?.data?.id);
      } catch (error) {}
    },
    [setConversationId]
  );

  const debounceLiveSearch = _.debounce(handleLiveSearch, 300);

  const renderMainSidebar = useMemo(() => {
    const viewByPath = {
      "/": () => <ConversationList />,
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
          <>{viewByPath[window.location.pathname]()}</>
        )}
      </>
    );
  }, [isSearch, listUser, handleClickUserSearched]);

  return (
    <>
      {_.isEmpty(user) ? (
        <Box height="100%" display="flex">
          <Spinner margin="auto" size="xl" color="teal.500" />
        </Box>
      ) : (
        <Box height="100%" display="flex">
          <Box
            width={"60px"}
            padding="10px 5px"
            display="flex"
            flexDirection="column"
            border="1px solid #e5e5e5"
          >
            <Box
              width="100%"
              aspectRatio={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="28px"
              borderRadius="10px"
              _hover={{
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              }}
            >
              <Icon icon="bi:chat-fill" />
            </Box>
          </Box>
          <Box
            width={"360px"}
            display="flex"
            flexDirection="column"
            border="1px solid #e5e5e5"
          >
            <Box
              paddingX="10px"
              paddingY="5px"
              borderBottom="1px solid #e5e5e5"
            >
              <Heading size="lg">Chat</Heading>
              <Box display="flex" alignItems="center">
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
                  placeholder="Find people with email"
                  onFocus={() => setSearch(true)}
                  onChange={debounceLiveSearch}
                />
              </Box>
            </Box>
            {renderMainSidebar}
          </Box>
          <Box flex={1}>
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
};

export default AppLayout;
