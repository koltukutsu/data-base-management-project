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
  Skeleton,
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
  const [totalPrice, setTotalPrice] = useState(0);
  // const [companies, setCompanies] = useState([]);
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [amountOfOffers, setAmountofOffers] = useState(0);
  const [chosenProducts, setChosenProducts] = useState([]);
  const [chosenOffers, setChosenOffers] = useState([]);

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
    // api.getCompanies().then((data) => {
    //   console.log("API: Gotten Companies")
    //   setCompanies(data);
    //   // return console.log(data);
    // });

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
    if (!selectedOrganization || Object.keys(selectedOrganization).length === 0) {
      // Render a skeleton when there's no selected organization
      return <img
        className="rounded-lg"
        src={"/images/placeholder.webp"}
        alt={"Place Holder"}
      />;
    } else {
      // Render the actual image when an organization is selected
      return (
        <img
          className="rounded-lg"
          src={organizationImages[selectedOrganization.id]}
          alt={selectedOrganization.org_name}
        />
      );
    }
  };

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

      const handleChosenCompanyOffer = (isChosenOffer, offer, userId, offerId, offerPrice) => {
        console.log("Here is the selected Company: ", selectedCompany)
        const numericOfferPrice = parseFloat(offerPrice);

        // if (userWallet < numericOfferPrice) {
        //   alert("Yetersiz bakiye. Lütfen cüzdanınızı doldurun.")
        //   return;
        // }
        // const isConfirmed = window.confirm('Bu teklifi kabul etmek istediğinize emin misiniz?');
        // if (!isConfirmed) {
        //   api.updateOffers(userId, offerId).then((data) => {
        //     console.log("API: updateOffers", offerId, data)
        //   })
        //   const updatedOffersLocally = offers.map((offer) => {

        //     if (offer.id === offerId) {
        //       offer.accepted = true;
        //       offer.accepted_by_id = userId;
        //     }
        //     return offer;
        //   })
        //   // take money from user wallet
        //   dispatch(takeMoneyFromUserWallet(numericOfferPrice))

        //   setOffers(updatedOffersLocally);
        // }

        // if (userWallet < numericOfferPrice) {
        //   alert("Yetersiz bakiye. Lütfen cüzdanınızı doldurun.")
        //   return;
        // }
        if (isChosenOffer) {
          const isConfirmed = window.confirm('Bu teklifi iptal etmek istediğinize emin misiniz?');
          if (isConfirmed) {
            setTotalPrice(totalPrice - numericOfferPrice)
            setChosenOffers(chosenOffers.filter((chosenProduct) => chosenProduct !== offer))
          }
        } else {
          const isConfirmed = window.confirm('Bu teklifi kabul etmek istediğinize emin misiniz?');
          if (isConfirmed) {
            setTotalPrice(totalPrice + numericOfferPrice)
            setChosenOffers([...chosenOffers, offer])

          }
        }
      };

      if (!offers || !selectedOrganization || !selectedSeason) {
        return null; // Add a check for undefined or null values
      }
      setAmountofOffers(offers.length)
      return offers.map((offer) => {
        // print every info related
        // console.log("Offer: ", offer)
        const isChosenOffer = chosenOffers.findIndex((chOffer) => chOffer === offer) !== -1;
        console.log("KONTROOLLLL")
        console.log("isChosenOffer: ", isChosenOffer)
        console.log("Offer: ", offer)
        console.log("Chosen Offers: ", chosenOffers)
        return (
          <TableRow key={offer.offerid}>
            <TableCell>{offer.offerid}</TableCell>
            <TableCell>{offer.comp_name}</TableCell>
            <TableCell>{offer.price}</TableCell>
            <TableCell><Button variant={isChosenOffer ? "contained" : "outlined"} onClick={() => handleChosenCompanyOffer(isChosenOffer, offer, userId, offer.id, offer.price)}>{isChosenOffer ? "Teklifi Kaldır" : "Teklifi Seç"}</Button></TableCell>
          </TableRow >
        );
      });
    }
    if (offers === undefined) {
      return null;
    }
    return (
      <Container className="rounded-lg border">
        <Box className="m-2">
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
        </Box>
      </Container>
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

        const handleChosenProductOffer = (isChosenProduct, product, userId, productName, productPrice) => {

          const numericOfferPrice = parseFloat(productPrice);
          // if (userWallet < numericOfferPrice) {
          //   alert("Yetersiz bakiye. Lütfen cüzdanınızı doldurun.")
          //   return;
          // }
          if (isChosenProduct) {
            const isConfirmed = window.confirm('Bu ürünü iptal etmek istediğinize emin misiniz?');
            if (isConfirmed) {
              setTotalPrice(totalPrice - numericOfferPrice)
              setChosenProducts(chosenProducts.filter((chosenProduct) => chosenProduct !== product))
            }
          } else {
            const isConfirmed = window.confirm('Bu ürünü kabul etmek istediğinize emin misiniz?');
            if (isConfirmed) {
              setTotalPrice(totalPrice + numericOfferPrice)
              setChosenProducts([...chosenProducts, product])

            }
          }

        }
        const isChosenProduct = chosenProducts.findIndex((chProduct) => chProduct === product) !== -1;
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
              <Button variant={isChosenProduct ? "contained" : "outlined"} onClick={() => handleChosenProductOffer(isChosenProduct, product, userId, product.productName, product.price)}>{isChosenProduct ? "Ürünü Kaldır" : "Ürünü Seç"}</Button></TableCell>
          </TableRow>
        );
      })
    }

    return (
      <Container className="rounded-lg border">
        <Box className="m-2">
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
        </Box>
      </Container>
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
      <Container className="border rounded-bg">
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
        </Button></Container>
    );
  };

  const CompaniesAndProductsChosenByUser = ({ chosenOffers, chosenProducts }) => {
    const onPurchase = () => {

    }

    const deleteChosenOffer = (offer) => {
      const numericOfferPrice = parseFloat(offer.price);
      const isConfirmed = window.confirm('Bu teklifi silmek istediğinize emin misiniz?');

      if (isConfirmed) {
        setTotalPrice(totalPrice - numericOfferPrice)
        setChosenOffers(chosenOffers.filter((chosenOffer) => chosenOffer !== offer))
      }
    }

    const deleteChosenProduct = (product) => {
      const numericProductPrice = parseFloat(product.price);
      const isConfirmed = window.confirm('Bu ürünü silmek istediğinize emin misiniz?');

      if (isConfirmed) {
        setTotalPrice(totalPrice - numericProductPrice)
        setChosenProducts(chosenProducts.filter((chosenProduct) => chosenProduct !== product))
      }

    }



    return (
      <Container className="border rounded-bg p-4">
        <Typography variant="h4" gutterBottom>Seçilenlerler</Typography>
        <Typography variant="h5" gutterBottom>Teklifler</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {/* make it bold */}
                <TableCell>Teklif ID</TableCell>
                <TableCell>Şirket Adı</TableCell>
                <TableCell>Fiyat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chosenOffers.map((offer) => (
                <TableRow key={offer.offerid}>
                  {/* Render offer details */}
                  <TableCell>{offer.offerid}</TableCell>
                  <TableCell>{offer.comp_name}</TableCell>
                  <TableCell>{offer.price}</TableCell>
                  <TableCell><Button onClick={() => deleteChosenOffer(offer)}
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >Sil</Button></TableCell>
                </TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" gutterBottom>Ürünler</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {/* Add the necessary columns */}
                <TableCell>Ürün ID</TableCell>
                <TableCell>Ürün Adı</TableCell>
                <TableCell>Fiyat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chosenProducts.map((product) => (
                <TableRow key={product.productId}>
                  {/* Render product details */}
                  <TableCell>{product.productId}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell><Button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => deleteChosenProduct(product)}>Sil</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Sum of the prices, use Typography */}
        <Typography variant="h5" gutterBottom className="pt-4">
          Toplam Fiyat: {totalPrice}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <Button onClick={onPurchase} variant="contained">Satın Al</Button>
        </div>
      </Container>
    );
  };


  return (
    <Container className="pt-10 pb-10">
      <UserInformation />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <OrganizationImages />
        </Grid>
        <Grid item xs={4}>
          <UserSpecialChoices />
        </Grid>
        <Grid item xs={8}>
          < CompaniesAndProductsChosenByUser chosenOffers={chosenOffers} chosenProducts={chosenProducts} />
        </Grid>

        <Grid item xs={6}>
          <AllOffersForTheOrganizationAndCompany />
        </Grid>
        <Grid item xs={6}>
          <AllProductsForOrganization />
        </Grid>

      </Grid>
    </Container>
  );
};

export default Home;
