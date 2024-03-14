import CustomInput from "@/components/CustomInput";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useClipboard } from "@mantine/hooks";
import _, { map } from "underscore";
import ReactQuill, { Quill } from "react-quill";


const StyledContainer = styled(Container)`
  margin: 10px;
  padding: 10px;
`;

const StyledBox = styled(Box)`
  margin: auto;
  width: 100%;
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

const Editor = dynamic(
  import("@/components/Editor"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

const Index = () => {
  // Get Data From User
  const { register, handleSubmit } = useForm();

  // Editor Quill
  const [editorValue, setEditorValue] =
    useState<ReactQuill.Value>("");



  // Date
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let CURRENT_DATE = `${day}/${month}/${year}`;

  // Clipboard Hook
  const { copy, copied } = useClipboard();
  const ref=useRef<ReactQuill|null>(null)

  const handleCopyAll = () => {
    
     copy(ref?.current?.getEditor().getText());
  };



  const onSubmit = (data: any) => {

    

    const number =
    data?.ticketNumber?.split(",");

    const unique= _.uniq(number);


    const allTicketNumbers = `
    Update ${CURRENT_DATE}
    Worked on these tickets
    ${unique
      ?.map(
        (item: any) =>
          `${data.link}/${data.ticketFormat}-${item}`
      )
      .join("\n")}
  `;

    setEditorValue(allTicketNumbers);
  };

 

  return (
    <StyledContainer>
      <StyledBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledTypography>
            Ticket Generator
          </StyledTypography>
          <StyledSecondaryText>
            Enter Default Link
          </StyledSecondaryText>
          <CustomInput
            fullWidth
            type="text"
            defaultValue="https://signaturepharmacy.atlassian.net/browse"
            {...register("link")}
          />
          <StyledSecondaryText>
            Enter Ticket Format
          </StyledSecondaryText>
          <CustomInput
            fullWidth
            type="text"
            defaultValue="SCN"
            {...register("ticketFormat")}
          />
          <StyledSecondaryText>
            Enter Ticket Number
          </StyledSecondaryText>
          <CustomInput
            fullWidth
            type="text"
            {...register("ticketNumber")}
            required
          />
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
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Editor
              theme="snow"
              value={editorValue}
              onInit={ref}
              onChange={setEditorValue}
            />
          </Grid>
          <Grid item md={6}>
            <StyledBox>
              <StyledTypography>
                Generated Ticket
              </StyledTypography>

              <Button
                variant="contained"
                color="info"
                sx={{ mt: 2 }}
                onClick={handleCopyAll}
              >
                {copied ? (
                  <span>Copied!</span>
                ) : (
                  <span>Copy</span>
                )}
              </Button>
              <div
                dangerouslySetInnerHTML={{
                  __html: editorValue,
                }}
              />
            </StyledBox>
          </Grid>{" "}
        </Grid>
      </Box>
    </StyledContainer>
  );
};

export default Index;
