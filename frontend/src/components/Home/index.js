import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Button,
  Container,
  Select,
  TextField,
  Grid,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { takeMoneyFromUserWallet } from "../../features/user/userSlice";
import api from "../../api";
import { UserInformation } from "../../features/user/UserInformation";

const organizationImages = {
  1: "/images/birthday.png",
  2: "/images/wedding.png",
  3: "/images/graduation.png",
  4: "/images/christmas.png",
  5: "/images/concert.png",
  6: "/images/costumes.png",
  7: "/images/bbq.png",
  8: "/images/camping.png",
  9: "/images/diner_party.png",
  10: "/images/cinema.png"
}


const Home = () => {
  const [selectedOrganization, setSelectedOrganization] = useState({});
  const [selectedCompany, setSelectedCompany] = useState({});
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedNumberOfPeople, setSelectedNumberOfPeople] = useState(0);
  const [seasons, setSeasons] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [amountOfOffers, setAmountofOffers] = useState(0);
  const userId = useSelector((state) => state.userLogger.userId);
  const userWallet = useSelector((state) => state.userLogger.wallet);

  const dispatch = useDispatch();

  const handleSelectedOrganization = (event) => {
    console.log("Here is the selected Organization: ", event.target.value)
    // api.getOffersBasedOnOrganization(event.target.value.org_name).then((data) => {
    //   console.log("Taken; getOffersBasedOnOrganization()", data)
    //   const amountOfOffers = data.offercount;
    //   setAmountofOffers(amountOfOffers)
    //   // return console.log(data);
    // })

    setSelectedOrganization(event.target.value);
  };
  // const handleSelectedCompany = (event) => {
  //   console.log("Here is the selected Company: ", event.target.value)
  //   setSelectedCompany(event.target.value);
  // };

  const handleSelectedSeason = (event) => {
    console.log("Here is the selected Season: ", event.target.value)
    setSelectedSeason(event.target.value);
  };

  // const handleSelectedNumberOfPeople = (event) => {
  //   console.log("Here is the selected Number of People: ", event.target.value)
  //   setSelectedNumberOfPeople(event.target.value);
  // };

  // const handleUserSpecialChoices = (amountOfPeople) => {

  // }

  useEffect(() => {
    document.title = "Parti Dünyası";
    api.welcomeMessage().then((data) => console.log(data.message));
    // necessary
    api.getOrganizations().then((data) => {
      console.log("API: Gotten Organizations", data)
      setOrganizations(data);

    });
    // not necessary
    api.getCompanies().then((data) => {
      console.log("API: Gotten Companies")
      setCompanies(data);
      // return console.log(data);
    });
    // api.listAvailableOffers().then((data) => {
    //   console.log("API: Gotten Offers")
    //   // setOffers(data);
    //   // setAmountofOffers(data.length);

    //   // set
    //   const seasons = new Set();
    //   data.forEach((offer) => {
    //     // console.log("offer:", offer)
    //     seasons.add(offer.time_period);
    //   })
    //   setSeasons([...seasons]);
    //   console.log("Seasons: ", seasons)
    //   // return console.log(data);
    // });

    api.getSeasons().then((data) => {
      console.log("API: Gotten Seasons", data)
      setSeasons(data);
      // return console.log(data);
    });

  }, []);

  // const ChooseOrganizationType = () => {
  //   return (
  //     <>
  //       <Typography variant="h4" gutterBottom>
  //         Parti Dünyası
  //       </Typography>
  //       <Typography variant="body1" paragraph>
  //         Organizasyon Çeşidi Seçiniz:
  //       </Typography>
  //       <Select
  //         label="Bir tane seçiniz"
  //         value={selectedOrganization}
  //         onChange={handleSelectedOrganization}
  //         fullWidth
  //         sx={{ marginTop: 2 }}
  //       >
  //         {/* ORGANIZATION TYPES */}
  //         {
  //           organizations.map((organization) => (
  //             <MenuItem key={organization.id} value={organization}>{organization.org_name}</MenuItem>
  //           ))
  //         }
  //       </Select>

  //     </>
  //   );
  // };
  const OrganizationImages = () => {
    console.log("Chosen organization image: ", organizationImages[selectedOrganization.id])
    return (
      <img className="rounded-lg" src={organizationImages[selectedOrganization.id]} />
    );
  }

  // const ChooseCompanyType = () => {
  //   return (
  //     <>
  //       <Typography variant="h4" gutterBottom>
  //         Şirketler
  //       </Typography>
  //       <Typography variant="body1" paragraph>
  //         Şirket Çeşidi Seçiniz:
  //       </Typography>
  //       <Select
  //         label="Bir tane seçiniz"
  //         value={selectedCompany}

  //         onChange={handleSelectedCompany}
  //         fullWidth
  //         sx={{ marginTop: 2 }}
  //       >
  //         {/* COMPANY TYPES */}
  //         {
  //           companies.map((company) => {
  //             return (
  //               <MenuItem key={company.id} value={company}>{company.comp_name}</MenuItem>
  //             );
  //           })
  //         }
  //       </Select>
  //       <Button
  //         type="submit"
  //         fullWidth
  //         variant="contained"
  //         sx={{ mt: 3, mb: 2 }} onClick={() => {
  //           setSelectedCompany({});
  //           setSelectedOrganization({});
  //         }}
  //       > Temizle</Button>
  //     </>
  //   );
  // }
  const AllOffersForTheOrganizationAndCompany = () => {
    // Assuming 'offers' state contains the data fetched from the API
    // Modify this according to your actual data structure

    // Replace with actual column names from your API response

    const columns = [
      "Teklif ID",
      // "Şirket ID",
      // "Organizasyon Türü",
      // "Kabul Edildi",
      "Şirket Adı",
      // "Maksimum Misafir Sayısı",
      // "Zaman Aralığı",
      "Fiyat",
      // "Kabul Eden Kullanıcı ID",
      "\t\t"
    ];
    const OfferRows = () => {

      const handleChosenCompanyOffer = (userId, offerId, offerPrice) => {
        console.log("Here is the selected Company: ", selectedCompany)
        const numericOfferPrice = parseFloat(offerPrice);
        if (userWallet < numericOfferPrice) {
          alert("Yetersiz bakiye. Lütfen cüzdanınızı doldurun.")
          return;
        }
        const isConfirmed = window.confirm('Bu teklifi kabul etmek istediğinize emin misiniz?');
        if (!isConfirmed) {
          api.updateOffers(userId, offerId).then((data) => {
            console.log("API: updateOffers", offerId, data)
          })
          const updatedOffersLocally = offers.map((offer) => {

            if (offer.id === offerId) {
              offer.accepted = true;
              offer.accepted_by_id = userId;
            }
            return offer;
          })
          // take money from user wallet
          dispatch(takeMoneyFromUserWallet(numericOfferPrice))

          setOffers(updatedOffersLocally);
        }
      };

      if (!offers || !selectedOrganization || !selectedSeason) {
        return null; // Add a check for undefined or null values
      }
      setAmountofOffers(offers.length)
      return offers.map((offer) => {
        // print every info related
        // console.log("Offer: ", offer)


        return (
          <TableRow key={offer.id}>
            {/* <TableCell>{offer.id}</TableCell> */}
            {/* <TableCell>{
              offer.comp_name}</TableCell>
            <TableCell>
              {offer.org_name}
            </TableCell> */}
            {/* <TableCell>{offer.accepted}</TableCell> */}
            {/* <TableCell>{offer.max_guest_count}</TableCell> */}
            {/* <TableCell>{offer.time_period}</TableCell> */}
            {/* <TableCell>{offer.price}</TableCell> */}
            <TableCell>{offer.offerid}</TableCell>
            <TableCell>{offer.comp_name}</TableCell>
            <TableCell>{offer.price}</TableCell>
            {/* <TableCell>{offer.accepted_by_id}</TableCell> */}
            <TableCell><Button onClick={() => handleChosenCompanyOffer(userId, offer.id, offer.price)}>Şirketi Seç</Button></TableCell>
          </TableRow>
        );
      });
    }
    if (offers === undefined) {
      return null;
    }
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Şirketler Teklifleri: {amountOfOffers}
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

  const AllProductsForOrganization = () => {
    const columns = [
      "Ürün ID",
      "Ürün İsmi",
      "Stok",
      "Ürün Fiyatı",
      "\t\t\t"
    ]
    const ProductRows = () => {
      return products.map((product) => {

        const handleChosenProductOffer = (userId, productName, productPrice) => {

          const numericOfferPrice = parseFloat(productPrice);
          if (userWallet < numericOfferPrice) {
            alert("Yetersiz bakiye. Lütfen cüzdanınızı doldurun.")
            return;
          }
          const isConfirmed = window.confirm('Bu teklifi kabul etmek istediğinize emin misiniz?');
          if (isConfirmed) {

          }
        }

        return (
          <TableRow key={product.productName}>
            <TableCell>{product.productId}</TableCell>
            <TableCell>{product.productName}</TableCell>
            <TableCell>
              {product.stock}
            </TableCell>
            <TableCell>{
              product.price}</TableCell>
            <TableCell>
              <Button onClick={() => handleChosenProductOffer(userId, product.productName, product.price)}>Ürünü Seç</Button></TableCell>
          </TableRow>
        );
      })
    }

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Ürünler: {products.length}
        </Typography>
        {products.length > 0 ? (
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
                <ProductRows />
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" paragraph>
            Henüz ürün yok
          </Typography>
        )}
      </>
    );
  }

  const UserSpecialChoices = () => {
    const handleFormSubmit = () => {
      console.log("Handle form submit for Special Choices")
      console.log("Handle this Here is the selected Organization: ", selectedOrganization)
      console.log("Here is the selected Season: ", selectedSeason)
      console.log("Here is the selected Number of People: ", selectedNumberOfPeople)
      const amountOfPeople = parseInt(selectedNumberOfPeople);

      api.getOffersBasedOnOrganization(selectedOrganization.org_name, selectedSeason, amountOfPeople).then((data) => {
        console.log("Taken; getOffersBasedOnOrganization()", data)
        const amountOfOffers = data[0].offercount;
        setAmountofOffers(amountOfOffers)
        console.log("AMOUNT OF OFFERS:", amountOfOffers)
        // return console.log(data);
      })

      // turn selectedNumberOfPoeple to number

      api.listAvailableOffers(selectedOrganization.org_name, selectedSeason, amountOfPeople).then((data) => {
        console.log("Taken; listAvailableOffers()", data)
        if (data.message === "No available offers found") {
          alert("Bu tercihler için uygun teklif bulunamadı.")
        }
        else {
          console.log("Taken; listAvailableOffers()", data)
          setOffers(data);
        }
        // return console.log(data);
      })

      // take products
      api.getProducts(selectedOrganization.org_name).then((data) => {
        console.log("Taken; getProductsBasedOnOrganization()", data)
        if (data.message === "Products are not found") {
          alert("Bu tercihler için uygun ürün bulunamadı.")
        } else {
          setProducts(data);
        }
        // return console.log(data);
      })
    };

    return (
      <>
        <Box noValidate sx={{ mt: 1 }}>
          <Typography variant="h4" gutterBottom>
            Parti Dünyası
          </Typography>
          <Typography variant="body1" paragraph>
            Organizasyon Çeşidi Seçiniz:
          </Typography>
          <Select
            label="Bir tane seçiniz"
            value={selectedOrganization}
            onChange={(e) => handleSelectedOrganization(e)}
            fullWidth
            sx={{ marginTop: 0 }}
          >
            {
              organizations.map((organization) => (
                <MenuItem key={organization.id} value={organization}>{organization.org_name}</MenuItem>
              ))
            }
          </Select>
          <Typography variant="body1" paragraph sx={{ marginTop: 1 }}>
            Sezon Seçiniz:
          </Typography>
          <Select
            required
            fullWidth
            margin="normal"
            id="season"
            name="season"
            label="Mevsim Seçiniz"
            value={selectedSeason}
            onChange={(e) => handleSelectedSeason(e)}
            sx={{ marginTop: 0 }}
          >
            {seasons.map((season) => (
              <MenuItem key={season.seasons} value={season.seasons}>
                {season.seasons}
              </MenuItem>
            ))}
          </Select>

          <TextField
            margin="normal"
            required
            fullWidth
            // make it string
            // type=""
            id="poeple"
            label="İnsan Sayısı Giriniz"
            name="people"
            value={selectedNumberOfPeople}
            onChange={(e) => setSelectedNumberOfPeople(e.target.value)}
            autoFocus
          />

        </Box>
        <Button
          // type="submit"
          fullWidth
          variant="contained"
          onClick={handleFormSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          Teklif Al
        </Button></>
    );
  };


  return (
    <Container className="pt-10">
      <UserInformation />
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <UserSpecialChoices />
        </Grid>
        <Grid item xs={8}>
          <OrganizationImages />
        </Grid>
        {/* <Grid item xs={4}>
          < UserSpecialChoices />
        </Grid> */}
        <Grid item xs={12}>
          <AllOffersForTheOrganizationAndCompany />
        </Grid>
        <Grid item xs={12}>
          <AllProductsForOrganization />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
