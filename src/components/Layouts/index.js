import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Heading, Input, Spinner } from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";
import _ from "lodash";

import { get } from "#/axios";

import { GlobalContext } from "#/contexts/GlobalContext";

import UserSearched from "./SearchResult";
import ConversationList from "./ConversationList";

const AppLayout = () => {
  const { user, setUser } = useContext(GlobalContext);
  const searchRef = useRef(null);
  const [isSearch, setSearch] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    try {
      const getData = async () => {
        const me = await get("/users/me");

        if (me.status === 200) {
          setUser(me?.data);
          get("/conversations").then((res) => {
            setConversations(res?.data?.list);
          });
        }
      };

      getData();
    } catch (error) {}
  }, [setUser, setConversations]);

  const handleLiveSearch = (event) => {
    const { value } = event?.target;

    if (!value.trim()) return;

    get(`/users?email=${value}`).then((res) => {
      setListUser(res.data?.list);
    });
  };

  const debounceLiveSearch = _.debounce(handleLiveSearch, 300);

  const renderMainSidebar = useMemo(() => {
    const viewByPath = {
      "/": () => <ConversationList conversations={conversations} />,
    };

    return (
      <>
        {isSearch ? (
          <Box flex={1} overflowY="scroll">
            {listUser &&
              listUser?.map((user, index) => (
                <UserSearched key={index} user={user} />
              ))}
          </Box>
        ) : (
          <>{viewByPath[window.location.pathname]()}</>
        )}
      </>
    );
  }, [isSearch, listUser, conversations]);

  return (
    <>
      {_.isEmpty(user) ? (
        <Box height="100%" display="flex">
          <Spinner margin="auto" size="xl" color="teal.500" />
        </Box>
      ) : (
        <Box height="100%" display="flex">
          <Box width={"60px"} border="1px solid #e5e5e5"></Box>
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
