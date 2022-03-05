import React from "react";
import styledComponents from "styled-components";
import { useGenukaDispatch, useGenukaState } from "../../store/genukaStore";
import Plus from "../icons/Plus";
import { ActionIcon, ZigZag } from "./Modal";

const InvisibleContainer = styledComponents.div`
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // background: red;
    width: 100%;
    z-index: 9999999;
`;

const Container = styledComponents.div`
  margin-bottom: 1rem;
  position :relative;
  box-shadow: 0 0 4px #AAA;
  min-width: 40%;
  max-width: 90%;
  padding: 1rem 1rem;
  background-color: white;
  overflow: hidden;
  color: black;
  font-size: 1.3rem;
  border-radius: 5px;
  background: black;
  text-align: center;
  color: white;
     @media (max-width: 600px) {
        & {
            width: 90%;
        }
    }

    padding-top: .75rem;
    display: flex;
    justify-content: space-between;
`;

const Text = styledComponents.div``;

const Notification = React.memo(({ notification, deleteNotification, timeout }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, timeout || 3000);
  }, []);

  React.useEffect(() => {
    if (!isVisible) {
      deleteNotification(notification);
    }
  }, [isVisible]);
  return (
    isVisible && (
      <Container key={Math.random()}>
        <Text>{notification}</Text>
        <ActionIcon
          onClick={() => {
            setIsVisible(false);
          }}
        >
          <Plus style={{ transform: "rotate(45deg)" }} color={"white"} />
        </ActionIcon>
        <ZigZag style={{ bottom: "-5px" }} />
      </Container>
    )
  );
});

function Notifications(props) {
  const { notifications } = useGenukaState();
  const dispatch = useGenukaDispatch();
  return (
    <InvisibleContainer>
      {notifications &&
        notifications.map((notification) => {
          return (
            <Notification
              notification={notification}
              key={Math.random()}
              deleteNotification={(notification) => {
                dispatch({ type: "notifications", payload: notifications.filter((n) => n != notification) });
              }}
            />
          );
        })}
    </InvisibleContainer>
  );
}

export default Notifications;
