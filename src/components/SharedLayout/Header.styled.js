import styled from '@emotion/styled';
import { AiTwotoneHome, AiOutlineTwitter } from 'react-icons/ai';

export const WrapHeader = styled.header`
  display: flex;
  justify-content: center;

  margin: 0 auto;

  background-color: #502f9d;

  margin-bottom: 50px;

  box-shadow: 0 4px 8px 0 rgba(80, 47, 157, 0.2),
    0 6px 20px 0 rgba(80, 47, 157, 0.19);
`;

export const Container = styled.div`
  display: flex;

  width: 1200px;
  padding: 20px 40px;
`;

export const HeaderLink = styled.a`
  display: flex;
  align-items: center;

  position: relative;
  text-decoration: none;
  color: white;
  font-size: 30px;
  padding: 10px;

  :not(:last-child) {
    margin-right: 10px;
  }

  ::before {
    content: '';
    position: absolute;
    height: 3px;
    left: 0px;
    bottom: 0px;
    transition: 0.6s;
    width: 0%;
    background: linear-gradient(to right, #ff0000, #fff200, #1e9600);
  }

  &:hover::before,
  &:focus::before {
    width: 100%;
  }
`;

export const HomeIcon = styled(AiTwotoneHome)`
  color: white;
  margin-right: 10px;
`;
export const TwitterIcon = styled(AiOutlineTwitter)`
  color: white;
  margin-right: 10px;
`;
