import styled from 'styled-components';
export const StyleheadingButton = styled.button`
background-color: ${(props) => props.color};
display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    width: 15px;
    height: 15px;
    line-height: 23px;
    border: 1px solid #e7e7e7;
    border-radius: 14px;
    text-align: center;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
	margin: 2px;
}
`;
export const Roww = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;
export const MainDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`;

export const ButtonDiv = styled.button`
	display: flex;
	flex-direction: column;
	justify-content: center;

	background: none;
	sborder: 0px;
	border: none;
`;

export const IconDiv = styled.p`
	color: black;
	padding-top: 5px;
	padding-left: 10px;
`;

export const ButtonText = styled.p`
	font-family: 'Poppins', sans-serif;
	font-size: 16px;
	color: black;
	font-weight: 600;
	padding-top: 5px;
	padding-left: 10px;
`;

export const DetailDiv = styled.p`
	border-top: 3px solid #ed3237;
	padding-top: 5px;
	padding-left: 10px;
`;

export const DetailText = styled.p`
	font-family: 'Poppins', sans-serif;
	font-size: 16px;
	color: grey;
	padding-top: 5px;
	padding-left: 10px;
`;

export const StyledDisplayNonediv = styled.div`
	@media screen and (min-width: 480px) {
		display: none;
	}
`;
export const StyledDisplayNonedivtwo = styled.div`
	@media screen and (max-width: 600px) {
		display: none;
	}
`;
