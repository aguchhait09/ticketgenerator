import CustomInput from "@/components/CustomInput";
import { Box, Button, Container, Typography, styled } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useClipboard } from '@mantine/hooks';
import _, { map } from 'underscore';
import ReactQuill from "react-quill";

const StyledContainer = styled(Container)`
  margin: 10px;
  padding: 10px;
`;

const StyledBox = styled(Box)`
  margin: auto;
  width: 50%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
  padding: 20px;
  border-radius: 10px;
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
  margin-bottom: 5px;
`;
const StyledNormalText = styled(Typography)`
  font-family: Times New Roman;
  margin-top: 5px;
  font-weight: bold;
`;

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const Index = () => {
  // Get Data From User
  const { register, handleSubmit } = useForm();
  const [ticketData, setTicketData] = useState<any>({});
  const number = ticketData?.ticketNumber?.split(",");
  const uniqeNumbers = _.uniq(number)
  console.log("data", uniqeNumbers);

  // Date
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let CURRENT_DATE = `${day}/${month}/${year}`;
  
  // Clipboard Hook
  const { copy, copied } = useClipboard();
  const allTicketNumbers = `
    Update ${CURRENT_DATE}
    Worked on these tickets
    ${uniqeNumbers?.map((item: any) => `${ticketData.link}/${ticketData.ticketFormat}-${item}`).join('\n')}
  `
  const handleCopyAll = () => {
    copy(allTicketNumbers);
  };

  // Editor Quill 
  const [editorValue, setEditorValue] = useState('')
  useEffect(()=>{
    setEditorValue(allTicketNumbers)
  },[uniqeNumbers,])
  

  return (
    <StyledContainer>
      <StyledBox>
        <form onSubmit={handleSubmit((data) => setTicketData(data))}>
          <StyledTypography>Ticket Generator</StyledTypography>
          <StyledSecondaryText>Enter Default Link</StyledSecondaryText>
          <CustomInput fullWidth type="text" defaultValue="https://signaturepharmacy.atlassian.net/browse" {...register("link")} />
          <StyledSecondaryText>Enter Ticket Format</StyledSecondaryText>
          <CustomInput fullWidth type="text" defaultValue="SCN" {...register("ticketFormat")} />
          <StyledSecondaryText>Enter Ticket Number</StyledSecondaryText>
          <CustomInput fullWidth type="text" {...register("ticketNumber")} required/>
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
        {number ? (
          <>
            <StyledNormalText>Update {CURRENT_DATE}</StyledNormalText>
            <StyledNormalText>Worked on these tickets</StyledNormalText>
          </>
        ) : null}
        {uniqeNumbers?.map((item: any) => (
          <div key={item}>
            <StyledSecondaryText>{`${ticketData.link}/${ticketData.ticketFormat}-${item}`}</StyledSecondaryText>
          </div>
        ))}
        <div dangerouslySetInnerHTML={{__html: editorValue}}/>
        <Button variant="contained" color="info" sx={{mt: 2}} onClick={handleCopyAll}>
        {copied ? <span>Copied!</span> : <span>Copy</span>}
        </Button>
        <QuillNoSSRWrapper theme="snow" value={editorValue} onChange={setEditorValue}/>
      </StyledBox>
    </StyledContainer>
  );
};

export default Index;
