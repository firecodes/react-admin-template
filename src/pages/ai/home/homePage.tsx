
import React, { FC, memo } from 'react';
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import CSS from './Style.module.css';
import { SplitterPanel } from '@/components';
import { ChatList } from './chat-list/ChatList';
import { ChatMessage } from './chat-message/ChatMessage';
import { HomeProvider, useHomeProvider } from './home-processor/HomeProvider'


// let ChatMessage = React.memo((props) => {
//   const navigate = useNavigate();
//   return (
//     <Result
//       status="500"
//       title="500"
//       subTitle="抱歉，您的网络不见了~🤦‍♂️🤦‍♀️"
//       extra={
//         <Button type="primary" onClick={() => navigate(-1)}>
//           返回上一页
//         </Button>
//       }
//     />
//   )
// })



export interface HomePageContextProps { }
const HomePageContext: FC<HomePageContextProps> = memo((props) => {
  const sliderVisible = useHomeProvider((status) => status.sliderVisible)
  return (
    <SplitterPanel leftVisible={sliderVisible} leftContent={<ChatList />}>
      {/* <ChatWinContextProvider>
        <ChatMessage />
      </ChatWinContextProvider> */}
      <ChatMessage></ChatMessage>
    </SplitterPanel>
  );
});

export interface IHomePageProps { }
const homePage: FC<IHomePageProps> = memo((props) => {
  return (
    <HomeProvider>
      <HomePageContext></HomePageContext>
    </HomeProvider>
  )
});
export default homePage