import * as React from "react";
import Image from "next/image";
import SideBarBody from "./Body";
import SideBarItem from "./Item";
import client from "../../assets/client.svg";
import inventory from "../../assets/inventory.svg";
import admin from "../../assets/admin.svg";

export function SideBar() {
  return (
    <SideBarBody>
      <SideBarItem
        href="/home"
        startContent={<Image src={admin} alt="Admin" />}
      >
        Feed
      </SideBarItem>
      <SideBarItem
        href="/applied"
        startContent={<Image src={client} alt="CLIENT" />}
      >
        Applied
      </SideBarItem>
      <SideBarItem
        href="/saved"
        startContent={<Image src={inventory} alt="Inventory" />}
      >
        Saved
      </SideBarItem>
    </SideBarBody>
  );
}
