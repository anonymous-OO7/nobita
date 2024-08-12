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
        href="/explore"
        startContent={<Image src={client} alt="CLIENT" />}
      >
        Explore
      </SideBarItem>
      <SideBarItem
        href="/profile"
        startContent={<Image src={inventory} alt="Inventory" />}
      >
        Profile
      </SideBarItem>
    </SideBarBody>
  );
}
