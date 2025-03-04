"use strict";
document.addEventListener("DOMContentLoaded", async () => {
  // Ensure ZOHO SDK is initialized
  await ZOHO.embeddedApp.init();
  //below is Date function and you can use it
  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthAbbreviation = monthNames[parseInt(month) - 1];
    return `${day}-${monthAbbreviation}-${year}`;
  }
  function getItemsSO() {
    const items = [];
    const itemRows = document.querySelectorAll(".itemrowupdateso, .item-rowso"); // Include both existing and new rows
    itemRows.forEach((row) => {
      const itemName =
        row.querySelector(".item-name-updateso")?.value ||
        row.querySelector(".item-nameAddRowso")?.value;
      const itemQty =
        row.querySelector(".item-code-updateso")?.value ||
        row.querySelector(".item-codeAddRowso")?.value;
      const itemDescription =
        row.querySelector(".itemDescriptionsoUpdate")?.value ||
        row.querySelector(".Description_AddRowso")?.value;
      const itemUnitQT =
        row.querySelector(".itemUnitsoUpdate")?.value ||
        row.querySelector(".itemUnitAddRowso")?.value;
      const itempriceCostQT =
        row.querySelector(".pieceCostsoUpdate")?.value ||
        row.querySelector(".priceCostAddRowso")?.value;
      const itemMarkupQT =
        row.querySelector(".markupsoUpdate")?.value ||
        row.querySelector(".markupAddRowso")?.value;
      const itemProductType = row.querySelector(".productTypeSOUpdate")?.value;
      //|| row.querySelector(".productTypeAddRowso")?.value;
      // Step 3 - Get all item fields
      if (itemName && itemQty) {
        items.push({
          // Use Zoho Creator item fields name
          Item: itemName,
          Qty: itemQty,
          Description: itemDescription,
          Unit: itemUnitQT,
          Piece_cost: itempriceCostQT,
          Margin: itemMarkupQT,
          Product_Type1: itemProductType,
        });
      }
    });
    return items;
  }
  // Function to update record
  const updateButtonso = document.getElementById("SOupdateChanges");
  if (!updateButtonso) {
    console.error("Button with ID 'SOupdateChanges' not found.");
    return;
  }
  updateButtonso.addEventListener("click", async () => {
    //alert("Button is clicked");
    //
    const soNameupdate = document.getElementById("sonameUpdate")?.value;
    const postProductionUpdate = document.getElementById(
      "Post_Production_dropdown_SOupdate"
    )?.value;
    const taxRateUpdateSO = document.getElementById("taxRateUpdateSO")?.value;
    const noteUpdate = document.getElementById("notesUpdateSO")?.value;
    const privateNoteUpdate = document.getElementById(
      "privateNoteUpdateSO"
    )?.value;
    const designProofUpdateSO = document.getElementById(
      "designProofUpdateSO"
    )?.value;
    const downPaymentPercentSOUpdate = document.getElementById(
      "downPaymentPercentUpdateso"
    )?.value;
    const permitNeededSOUpdate = document.getElementById(
      "permitNeededUpdateSO"
    )?.value;
    const siteSurveySOUpdate =
      document.getElementById("siteSurveyUpdateSO")?.value;
    const leadTimeQTUpadate =
      document.getElementById("leadTimeUpadateSO")?.value;
    const vendorInputNeededUpdateSO = document.getElementById(
      "vendorInputNeededUpdateSO"
    )?.value;

    const Customer_due_date_SOUpdate = document.getElementById(
      "Customer_due_date_SOUpdate"
    )?.value;
    const commitmentDateSOUpdate = document.getElementById(
      "commitmentDateSOUpdate"
    )?.value;
    //
    const divIDItemSO = document.getElementById("divIDItemSO");
    if (!divIDItemSO) {
      alert("Error: divIDItemSO not found.");
      return;
    }
    //const SOID = divIDItemSO.getAttribute("data-idso");
    // Define the connection name
    const conn_name = "crmwidgetconnection";
    // Construct the payload
    const payload = {
      parameters: {
        data: {
          Tax_rate: taxRateUpdateSO,
          SO_name: soNameupdate,
          Post_production: postProductionUpdate,
          Status: "Draft",
          Source: "Widget",
          Notes: noteUpdate,
          Private_Notes_widget: privateNoteUpdate,
          Lead_time_from_approval_Business_Days: leadTimeQTUpadate,
          is_Design_Proof_needed: designProofUpdateSO,
          Permit_needed: permitNeededSOUpdate,
          Site_Survey_Needed: siteSurveySOUpdate,
          Down_Payment: downPaymentPercentSOUpdate,
          Vendor_input_need: vendorInputNeededUpdateSO,
          Customer_due_date: formatDate(Customer_due_date_SOUpdate),
          Our_Commitment_Date: formatDate(commitmentDateSOUpdate),
          Item_Details: getItemsSO(),
          // Reference_URL: urlsSo,
          // SO_Date: window.genrateDate(0, true),
          // Did_customer_provide_a_customer_PO: DidCustomerProvidePO,
          // PO_Number: PO_Number,
          // CRM_Account_Name: window.accountId,
          // Vendor_Number: window.vendorName,
          // Widget_CRM_Contact_Name: window.contactNameSO,
          // Salesperson_Lookup: window.salespersonIDSO,
          // //skip_workflow: ["all"],
          // Shipping_Name: window.shippingNameSO,
          // Billing_Name: window.accountName,
          // Phone_Number: window.shippingphoneFieldsSO,
          // Ship_To: {
          //   address_line_1: window.shippingStreetFieldSO,
          //   address_line_2: window.shippingStreetLine2FieldSO,
          //   district_city: window.shippingCityFieldSO,
          //   state_province: window.shippingStateFieldSO,
          //   postal_Code: window.shippingCodeFieldSO,
          // },
          // Bill_To: {
          //   address_line_1: window.billingStreetFieldSO,
          //   postal_Code: window.billingCodeFieldSO,
          //   district_city: window.billingCityFieldSO,
          //   state_province: window.billingStateFieldSO,
          // },
          // //
          // Delivery_address: {
          //   address_line_1: SO_PO_DOV_addressLine1,
          //   address_line_2: SO_PO_DOV_addressLine2,
          //   district_city: SO_PO_DOV_city,
          //   state_province: SO_PO_DOV_state,
          //   postal_Code: SO_PO_DOV_zipCode,
          // },
          // Vehicle_number: SO_PO_DRT_vehicleNumber,
          // Delivery_Address_rented_truck: {
          //   address_line_1: aSO_PO_DRT_ddressLine1,
          //   address_line_2: SO_PO_DRT_addressLine2,
          //   district_city: SO_PO_DRT_city,
          //   state_province: SO_PO_DRT_state,
          //   postal_Code: SO_PO_DRT_zipCode,
          // },
          // Do_we_know_who_is_picking_up: SO_PO_CP_knowWhoIsPickingUp,
          // Do_we_know_when_will_customer_pickup: SO_PO_CP_knowWhenPickup,
          // Name: SO_PO_CP_pickupName,
          // Ship_to_address: {
          //   address_line_1: SO_PO_DS_addressLine1,
          //   address_line_2: SO_PO_DS_addressLine2,
          //   district_city: SO_PO_DS_city,
          //   state_province: SO_PO_DS_state,
          // },
          // Where_will_it_ship_from: SO_PO_DS_whereWillitShip,
          // Our_Account: SO_PO_UFOA_ourAccount,
          // Next_day_shipment_needed: SO_PO_UFOA_nextdayshippment,
          // Regular_Ground_shipment: SO_PO_UFOA_regulargroundshipment,
          // Charge_normal_markup: SO_PO_UFOA_chnagenormalmode,
          // Account_Numer: SO_PO_UFOA_accountNumber,
          // Need_Multiple_Locations_Send_UPS_Our_Account:
          //   SO_PO_UFOA_needMultipleLocations,
          // Pallet_size_needed_provide_estimate: SO_PO_FD_palletSize,
          // Who_will_arrange_freight_pickup: SO_PO_FD_freightPickupArrangement,
          // Need_Multiple_Locations_Send_UPS_customer:
          //   SO_PO_UFCA_needMultipleLocationsCustomer,
          // //install
          // Manufacture_Type: ManufactureTypeSO,
          // Install_type: InstallTypeSO,
          // Sign_permit_required: SignPermitSO,
          // Electrical_Permit_required: ElectricalPermitSO,
          // Electrical_connection_made_by_us: ElectricalConnectionSO,
          // Miss_DIG_required1: MissDigSO,
          // Type_of_Work_Needed: Type_of_Work_Needed,
          // Install_Summary_of_Work: Install_Summary_of_Work,
          // Has_the_wall_recently_been_painted: HasTheWallSO,
          // Is_there_a_working_elevator_available: IsThereWorkingSO,
          // Is_rental_equipment_needed: IsRentalSO,
          // In_house_large_equipment_needed: InHouseSO,
          // Is_hardware_needed: IsHardwareSO,
          // Hardware_grade: HardwareGradeSO,
          // What_floor_s_will_Signage_be_installed: WhatFloorSO,
          // Number_of_Visits_needed: NumberOFVIsitSO,
          // How_many_installers_needed2: HowManyInstallerSO,
          // Appprox_fabrication_time_Hours: AppproxFaSO,
          // Estimated_hours_of_travel: EstimateHouerSO,
          // Estimated_hours_on_site: EstimateHouerOnSO,
          // Whta_type_of_Hardware_Specific: Whta_type_of_Hardware_Specific,
          // URL_Link1: URL_Link1,
          // URL_Link2: URL_Link2,
          // :InhouseEqupmentSO,
          // :AnyObstrictionSO,
          // :RentalEquipmentSO,
          // :PowerEquipmentSO,
          //Preferred_Time this field Data type is Time
        },
      },
      method: "PATCH",
      url: `https://www.zohoapis.com/creator/v2.1/data/sst1source/source-erp/report/All_Salesorder_List_view/${window.MainRecordIDfor_ItemDetailsso}`,
      param_type: 2,
    };
    // Function to update record
    async function updateRecord() {
      try {
        if (!ZOHO || !ZOHO.CRM || !ZOHO.CRM.CONNECTION) {
          throw new Error("ZOHO CRM SDK not initialized.");
        }
        let response = await ZOHO.CRM.CONNECTION.invoke(conn_name, payload);
        console.log("Update Response:", response);
        if (response.code === "SUCCESS" && response.details) {
          //alert("Record Updated Successfully!");
          Swal.fire({
            title: "Record Submitted",
            text: "Thank you",
            icon: "success",
          });
          //
          console.log("Record Updated Successfully:", response.details);
        } else {
          alert(
            "Failed to update record: " + (response.message || "Unknown error")
          );
        }
      } catch (error) {
        console.error("Error updating record:", error);
        alert("An error occurred while updating the record.");
      }
    }
    // Call update function after button click
    await updateRecord();
    setTimeout(() => {
      location.reload();
    }, 6000);
    ////
  }); //end of click event
}); //End of DOM

// function getItemsSO() {
//   const items = [];
//   const itemRows = document.querySelectorAll(".itemrowupdateso"); // Use querySelectorAll to get all matching elements
//   console.log(itemRows);
//   itemRows.forEach((row) => {
//     const itemName = row.querySelector(".item-name-updateso").value;
//     const itemQty = row.querySelector(".item-code-updateso").value;
//     const itemDescription = row.querySelector(
//       ".itemDescriptionsoUpdate"
//     ).value;
//     const itemUnitQT = row.querySelector(".itemUnitsoUpdate").value;
//     const itemMarkupQT = row.querySelector(".markupsoUpdate").value;
//     const itempriceCostQT = row.querySelector(".pieceCostsoUpdate").value;
//     const itemProductType = row.querySelector(".productTypeSOUpdate").value;
//     console.log(itemName, itemQty);
//     // Step 3 - Get all item fields
//     if (itemName && itemQty) {
//       items.push({
//         // Use Zoho Creator item fields name
//         Item: itemName,
//         Qty: itemQty,
//         Description: itemDescription,
//         Unit: itemUnitQT,
//         Piece_cost: itempriceCostQT,
//         Margin: itemMarkupQT,
//         Product_Type1: itemProductType,
//       });
//     }
//   });
//   return items;
// }
