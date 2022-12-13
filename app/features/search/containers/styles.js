import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 80,
    backgroundColor: "#eee",
    borderWidth: 1
  },
  containerSearchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10
  },
  containerSearch: {
    flex: 1,
    flexDirection: "column",
    marginTop: 60


  },
  buttonSearch: {
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    flexDirection: "row"
  },
  labelSearch: {
    color: "black",
    marginRight: 5
  },
  containerProductList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  touchableLabelProduct: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10
  },
  iconListProduct: {
    marginLeft: 10
  },
  nameOfProduct: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 20,
    color: "black"
  },
  sizeNotFound: {
    fontSize: 20

  },
  imageBackground: {
    flex: 1,
    justifyContent: "center"
  },
  scrollView: {
    width: "100%"
  }
});