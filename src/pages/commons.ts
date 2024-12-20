import { Input } from "baseui/input";
import styled from "styled-components";

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 0px;
`;

// Style for the rounded image
export const Rounded = styled.img`
  background-color: #f5f5f5;
  border-radius: 50%;
  width: 170px; 
  height:170px; 
  margin-bottom: 0px; 
`;

export const ProfileRounded = styled.img`
  border-radius: 50%;
  width: 200px; 
  height:200px; 
  margin-bottom: 0px; 
`;

export const Container = styled.div`
  width: 100%;
  height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  
`;

export const InnerContainer = styled.div`
  width: 500px;  
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 4rem;
`;

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 30px; /* Optional: Adjust the margin as needed */
`;

export const ProfileInnerContainer = styled.div`
  width: 500px;  
  height: 600px;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 4rem;
  margin-top: 100px;
  box-shadow: 0px 3px 9px rgba(15, 15, 15, 0.6);
`;

export const Wrapper = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

export const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  textAlign: "center"
  width: 100%;
  margin: 1rem 0;
`;


export const ErrorText = styled.span`
  color: #eb5d5d;
  font-size: 18px;
  margin: 7px 0;
`;

export const UserName = styled.div`
  font-weight: 700; 
  font-size: 40px; 
`;

export const Title = styled.div`
  font-weight: 700; 
  font-size: 17px; 
`;

export const Bio = styled.div`
  font-size: 16px; 
`;

export const CustomButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 700; 
  font-size: 17px; 

  &:hover {
    color: #6b7280;
  }
`;

export const CustomLink = styled.a`
  cursor: pointer;
  font-weight: 500; 
  font-size: 17px; 

  &:hover {
    color: #6b7280;
  }
`;