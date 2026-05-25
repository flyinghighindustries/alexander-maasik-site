import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import LocationTemplate from "./templates/location";
import enData from "../localData/alexander-maasik_en.json";
import etData from "../localData/alexander-maasik_et.json";
import type { Locale } from "./types/entity";

const params = new URLSearchParams(window.location.search);
const locale: Locale = params.get("lang") === "et" ? "et" : "en";

const document = {
  ...(locale === "et" ? etData : enData),
  meta: { locale },
};

window.document.documentElement.lang = locale;

ReactDOM.createRoot(window.document.getElementById("root")!).render(
  <React.StrictMode>
    <LocationTemplate
      document={document as never}
      __meta={{ mode: "preview", locale } as never}
      relativePrefixToRoot=""
      path=""
      pageUrl=""
    />
  </React.StrictMode>,
);
