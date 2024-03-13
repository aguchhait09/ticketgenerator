import CustomInput from "@/components/CustomInput";
import { Box, Button, Container, Typography, styled } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const StyledContainer = styled(Container)`
  margin: 10px;
  padding: 10px;
`;

const StyledBox = styled(Box)`
  margin: auto;
  width: 50%;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radious: 10px;
`;
const StyledTypography = styled(Typography)`
  text-align: center;
  font-family: Times New Roman;
  font-weight: bold;
  font-size: 25px;
`;
const StyledSecondaryText = styled(Typography)`
  font-family: Times New Roman;
  margin-top: 5px;
  margin-botom: 5px;
`;
const StyledNormalText = styled(Typography)`
  font-family: Times New Roman;
  margin-top: 5px;
  font-weight: bold;
`;

const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  }
  
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]
const index = () => {
  const { register, handleSubmit } = useForm();
  const [ticketData, setTicketData] : any= useState([]);
  const number = ticketData?.ticketNumber?.split(",");
  console.log("data", ticketData?.ticketNumber);

  // Editor


  // Date
  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1;
  let year = date.getFullYear()

  let CURRENT_DATE = `${day}/${month}/${year}`

  return (
    <StyledContainer>
      <StyledBox>
        <form onSubmit={handleSubmit((data) => setTicketData(data as any))}>
          <StyledTypography>Ticket Generator</StyledTypography>
          <StyledSecondaryText>Enter Default Link</StyledSecondaryText>
          <CustomInput fullWidth type="text" defaultValue="https://signaturepharmacy.atlassian.net/browse" {...register("link")} />
          <StyledSecondaryText>Enter Ticket Format</StyledSecondaryText>
          <CustomInput fullWidth type="text" defaultValue="SCN" {...register("ticketFormat")} />
          <StyledSecondaryText>Enter Ticket Number</StyledSecondaryText>
          <CustomInput fullWidth type="text" {...register("ticketNumber")} />
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            type="submit"
          >
            Generate
          </Button>
        </form>
      </StyledBox>
      <StyledBox sx={{ mt: 5 }}>
        <StyledTypography>Generated Ticket</StyledTypography>
        {
          number ? (
            <>
            <StyledNormalText>Update {CURRENT_DATE}</StyledNormalText>
              <StyledNormalText>Worked on these tickets</StyledNormalText>
            </>
          ) : null
        }
        {number?.map((item: any) => {
          return (
            <>
            <StyledSecondaryText>{`${ticketData.link}/${ticketData.ticketFormat}-${item}`}</StyledSecondaryText>
            </>
          );
        })}
      </StyledBox>
    </StyledContainer>
  );
};

export default index;
