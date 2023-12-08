import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const ChooseOrganizationType = () => {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Parti Dünyası
        </Typography>
        <Typography variant="body1" paragraph>
          Organizasyon Çeşidi Seşiniz:
        </Typography>
        <Select
          label="Choose an option"
          value={selectedOption}
          onChange={handleChange}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {/* ORGANIZATION TYPES */}
          <MenuItem value="option1">Organizasyon 1</MenuItem>
          <MenuItem value="option2">Organizasyon 2</MenuItem>
          <MenuItem value="option3">Organizasyon 3</MenuItem>
        </Select>
        {selectedOption && (
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Seçilen Organizasyon: {selectedOption}
          </Typography>
        )}
      </>
    );
  };
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <ChooseOrganizationType />
        </Grid>
        <Grid item xs={4}>
          <ChooseOrganizationType />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
