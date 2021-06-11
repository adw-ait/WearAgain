import React, { createContext, useContext, useEffect, useState } from "react";
import "./stylesheet/style.css";
import TshirtContainer from "./TshirtContainer";
import { fabric } from "fabric";
import Settings from "./Settings";
import "./Fonts.css";
import html2canvas from "html2canvas";
import { storageRef } from "../firebase/utils";
import { useHistory, useParams } from "react-router";
import { auth } from "../firebase/utils";
import { ProductDetailContext } from "../Components/ProductDetails/ProductDetails";
import { useDispatch } from "react-redux";
import { addNewEditImageStart } from "../redux/EditImage/editImage.actions";

export const Home = createContext();

function EditModule() {
  const { productID } = useParams();
  // const { handleNewImage } = useContext(ProductDetailContext);
  const [tshirtProps, settshirtProps] = useState("#62959c");
  const [canvas, setCanvas] = useState();
  const [ObjectSelected, setObjectSelected] = useState(false);
  const [selectedObjectProps, setselectedObjectProps] = useState({});
  const [fontFamily, setfontFamily] = useState("monospace");
  const [isUploaded, setisUploaded] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    if (isUploaded) {
      history.goBack();
    }
  }, [isUploaded]);
  /**TOGGLE DELETE BUTTON ON OBJECT SELECTION  */
  useEffect(() => {
    if (!canvas) {
      return;
    }

    canvas.on("selection:created", (e) => {
      setObjectSelected(true);
      if (canvas.getActiveObject().get("type") === "i-text") {
        setselectedObjectProps(e.target);
      }
    });
    canvas.on("selection:cleared", () => {
      setObjectSelected(false);
    });
  }, [canvas]);

  /** CHANGE COLOR VIA INPUT */
  const changeColorText = (e) => {
    const temp = e;
    settshirtProps(temp);
  };
  /** INITIALIZE CANVAS */
  const initCanvas = () => {
    return new fabric.Canvas("tcanvas", {
      height: 400,
      width: 200,
    });
  };

  /** ADD IMAGE TO CANVAS */
  const addImage = (url) => {
    new fabric.Image.fromURL(url, (img) => {
      img.scaleToHeight(200);
      img.scaleToWidth(200);
      canvas.add(img);
      canvas.renderAll();
    });
  };

  /** CHANGE TSHIRT COLOR */
  const changeColor = (e) => {
    let temp = e;
    settshirtProps(temp);
  };

  /** REMOVE SELECTED IMAGE FROM CANVAS */
  const removeImage = (canvi) => {
    canvi.remove(canvi.getActiveObject());
  };

  /**ADD TEXT TO CANVAS */
  const addTextToTshirt = (text) => {
    const addText = new fabric.IText(text, {
      textBackgroundColor: "",
      underline: "",
      overline: "",
      fill: "#000000",
      fontFamily: "monospace",
    });
    canvas.add(addText);
    canvas.renderAll();
  };

  /** HANDLE CANVAS FONT CHANGE */
  const handleCanvasFontChange = (currFont) => {
    setfontFamily(currFont);
  };

  /**EDIT TEXT STYLES */
  const textStyles = (whichStyle) => {
    const activeObject = canvas.getActiveObject();
    switch (whichStyle.target.id) {
      //  BOLD
      case "bold-text":
        activeObject.set(
          "fontWeight",
          selectedObjectProps.fontWeight === "normal" ? "bold" : "normal"
        );

        break;

      // ITALIC
      case "italic-text":
        activeObject.set(
          "fontStyle",
          selectedObjectProps.fontStyle === "normal" ? "italic" : "normal"
        );

        break;

      // UNDERLINE
      case "underline-text":
        activeObject.set("underline", !selectedObjectProps.underline);

        break;

      // OVERLINE
      case "overline-text":
        activeObject.set("overline", !selectedObjectProps.overline);

        break;

      // TEXT FONT FAMILY
      case "font-text":
        activeObject.set("fontFamily", fontFamily);
        break;

      //DEFAULT
      default:
        return null;
    }
    canvas.renderAll();
  };

  const handleSaveCanvas = () => {
    var element = document.getElementById("tshirtContainer");
    // console.log(element);
    html2canvas(element).then(function (canvas) {
      var base64image = canvas.toDataURL();

      return new Promise((resolve, reject) => {
        var imageRef = storageRef.child(
          `images/${auth.currentUser.uid}/${productID}/${auth.currentUser.uid}${productID}.png`
        );

        imageRef
          .putString(base64image.substr(22), "base64")
          .then((snapshot) => {
            imageRef.getDownloadURL().then((downloadURL) => {
              dispatch(
                addNewEditImageStart({
                  productID,
                  downloadURL,
                })
              );
            });
            console.log("Uploaded a base64 string!");
            setisUploaded(true);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    });

    // html2canvas(element).then(function (canvas) {
    //   // Export canvas as a blob
    //   canvas.toBlob(function (blob) {
    //     // Generate file download
    //     console.log(blob);
    //     // FileSaver.saveAs(blob, "editedImage.png");
    //   });
    // });
  };

  return (
    <div className="container">
      <Home.Provider
        value={{
          tshirtProps,
          canvas,
          addImage,
          changeColor,
          removeImage,
          changeColorText,
          ObjectSelected,
          addTextToTshirt,
          textStyles,
          handleCanvasFontChange,
          fontFamily,
          handleSaveCanvas,
        }}
      >
        <Settings />
        <TshirtContainer />
      </Home.Provider>
      {isUploaded && (
        <span className="text-lg font-semibold text-green-500">
          Image saved Successfully
        </span>
      )}
    </div>
  );
}

export default EditModule;
