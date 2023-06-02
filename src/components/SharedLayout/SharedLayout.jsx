import { Outlet } from 'react-router-dom';
// import { MdHome } from 'react-icons/md';
// import { AiOutlineTwitter } from 'react-icons/ai';
// import { AiTwotoneHome, AiOutlineTwitter } from 'react-icons/ai';

import {
  Container,
  HeaderLink,
  HomeIcon,
  TwitterIcon,
  WrapHeader,
} from './Header.styled';

export const SharedLayout = () => {
  return (
    <>
      <WrapHeader>
        <Container>
          <HeaderLink href="/TweetTrends/">
            <HomeIcon />
            Home
          </HeaderLink>
          <HeaderLink href="/TweetTrends/tweets">
            <TwitterIcon />
            Tweets
          </HeaderLink>
        </Container>
      </WrapHeader>
      <main>
        <Outlet />
      </main>
    </>
  );
};
