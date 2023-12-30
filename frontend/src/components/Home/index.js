import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Container,
  Select,
  Grid,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import api from "../../api";

const Home = () => {
  const [selectedOrganization, setSelectedOrganization] = useState({});
  const [selectedCompany, setSelectedCompany] = useState({});
  const [organizations, setOrganizations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [offers, setOffers] = useState([]);
  const [amountOfOffers, setAmountofOffers] = useState(0);

  const handleSelectedOrganization = (event) => {
    console.log("Here is the selected Organization: ", event.target.value)
    setSelectedOrganization(event.target.value);
  };
  const handleSelectedCompany = (event) => {
    console.log("Here is the selected Company: ", event.target.value)
    setSelectedCompany(event.target.value);
  };

  useEffect(() => {
    document.title = "Parti Dünyası";
    api.welcomeMessage().then((data) => console.log(data.message));
    api.getOrganizations().then((data) => {
      console.log("API: Gotten Organizations")
      setOrganizations(data);
      // return console.log(data);
    });
    api.getCompanies().then((data) => {
      console.log("API: Gotten Companies")
      setCompanies(data);
      // return console.log(data);
    });
    api.listAvailableOffers().then((data) => {
      console.log("API: Gotten Offers")
      setOffers(data);
      setAmountofOffers(data.length);
      // return console.log(data);
    });
  }, []);

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
          label="Bir tane seçiniz"
          value={selectedOrganization}
          onChange={handleSelectedOrganization}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {/* ORGANIZATION TYPES */}
          {
            organizations.map((organization) => (
              <MenuItem key={organization.id} value={organization}>{organization.org_name}</MenuItem>
            ))
          }
        </Select>

      </>
    );
  };
  const OrganizationImages = () => {
    return (
      <>
      </>
    );
  }

  const ChooseCompanyType = () => {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Şirketler
        </Typography>
        <Typography variant="body1" paragraph>
          Şirket Çeşidi Seşiniz:
        </Typography>
        <Select
          label="Bir tane seçiniz"
          value={selectedCompany}

          onChange={handleSelectedCompany}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {/* COMPANY TYPES */}
          {
            companies.map((company) => {
              return (
                <MenuItem key={company.id} value={company}>{company.comp_name}</MenuItem>
              );
            })
          }
        </Select>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }} onClick={() => {
            setSelectedCompany({});
            setSelectedOrganization({});
          }}
        > Temizle</Button>
      </>
    );
  }
  const AllOffersForTheOrganization = () => {
    // Assuming 'offers' state contains the data fetched from the API
    // Modify this according to your actual data structure

    // Replace with actual column names from your API response
    const columns = [
      "Teklif ID",
      "Şirket ID",
      "Organizasyon Türü",
      "Kabul Edildi",
      "Maksimum Misafir Sayısı",
      "Zaman Aralığı",
      "Fiyat",
      "Kabul Eden Kullanıcı ID"
    ];
    const OfferRows = () => {
      console.log(offers.length)
      if (selectedOrganization.id && selectedCompany.id) {
        const filteredOffers = offers.filter(
          (offer) => (offer.org_type === selectedOrganization.id) && (offer.comp_id === selectedCompany.id)
        )
        setAmountofOffers(filteredOffers.length)
        return filteredOffers
          .map((offer) => {
            return (
              <TableRow key={offer.id}>
                <TableCell>{offer.id}</TableCell>
                <TableCell>{companies.find(
                  (company) => company.id === offer.comp_id
                ).comp_name}</TableCell>
                <TableCell>
                  {organizations.find((organization) => organization.id === offer.org_type).org_name}
                </TableCell>
                <TableCell>{offer.accepted}</TableCell>
                <TableCell>{offer.max_guest_count}</TableCell>
                <TableCell>{offer.time_period}</TableCell>
                <TableCell>{offer.price}</TableCell>
                <TableCell>{offer.accepted_by_id}</TableCell>
              </TableRow>
            );
          })
      } else if (selectedOrganization.id) {
        const filteredOffers = offers.filter(
          (offer) => (offer.org_type === selectedOrganization.id)
        )
        setAmountofOffers(filteredOffers.length)

        return filteredOffers.map((offer) => {
          return (
            <TableRow key={offer.id}>
              <TableCell>{offer.id}</TableCell>
              <TableCell>{companies.find(
                (company) => company.id === offer.comp_id
              ).comp_name}</TableCell>
              <TableCell>
                {organizations.find((organization) => organization.id === offer.org_type).org_name}
              </TableCell>
              <TableCell>{offer.accepted}</TableCell>
              <TableCell>{offer.max_guest_count}</TableCell>
              <TableCell>{offer.time_period}</TableCell>
              <TableCell>{offer.price}</TableCell>
              <TableCell>{offer.accepted_by_id}</TableCell>

            </TableRow>
          );
        })

      } else if (selectedCompany.id) {
        const filteredOffers = offers.filter(
          (offer) => (offer.comp_id === selectedCompany.id)
        )
        setAmountofOffers(filteredOffers.length)

        return filteredOffers.map((offer) => {
          return (
            <TableRow key={offer.id}>
              <TableCell>{offer.id}</TableCell>
              <TableCell>{companies.find(
                (company) => company.id === offer.comp_id
              ).comp_name}</TableCell>
              <TableCell>
                {organizations.find((organization) => organization.id === offer.org_type).org_name}
              </TableCell>
              <TableCell>{offer.accepted}</TableCell>
              <TableCell>{offer.max_guest_count}</TableCell>
              <TableCell>{offer.time_period}</TableCell>
              <TableCell>{offer.price}</TableCell>
              <TableCell>{offer.accepted_by_id}</TableCell>
            </TableRow>
          );
        });
      }
      else {
        setAmountofOffers(offers.length)
        return offers.map((offer) => {
          return (
            <TableRow key={offer.id}>
              <TableCell>{offer.id}</TableCell>
              <TableCell>{companies.find(
                (company) => company.id === offer.comp_id
              ).comp_name}</TableCell>
              <TableCell>
                {organizations.find((organization) => organization.id === offer.org_type).org_name}
              </TableCell>
              <TableCell>{offer.accepted}</TableCell>
              <TableCell>{offer.max_guest_count}</TableCell>
              <TableCell>{offer.time_period}</TableCell>
              <TableCell>{offer.price}</TableCell>
              <TableCell>{offer.accepted_by_id}</TableCell>
            </TableRow>
          );
        });
      }
    }

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Seçilen Organizasyon İçin Tüm Teklifler: {amountOfOffers}
        </Typography>
        {offers.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <OfferRows />
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" paragraph>
            Henüz teklif yok
          </Typography>
        )}
      </>
    );
  };

  return (
    <Container className="p">
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <ChooseOrganizationType />
        </Grid>
        <Grid item xs={4}>
          <ChooseCompanyType />
        </Grid>
        <Grid item xs={12}>
          <AllOffersForTheOrganization />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
