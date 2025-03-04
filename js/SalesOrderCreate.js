//below code is working to create SO into Zoho Creator
"use strict";
document.addEventListener("DOMContentLoaded", () => {
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
  //
  function getItemsSO() {
    const items = [];
    const itemRows = document.querySelectorAll(".item-rowSO");
    console.log(itemRows);
    itemRows.forEach((row, index) => {
      const itemName = row.querySelector(".item-nameSO").value;
      const itemQty = parseInt(row.querySelector(".item-codeSO").value);
      const itemDescription = row.querySelector(".Description-SO").value;

      const itemUnitQT = row.querySelector(".itemUnitSO").value;
      const itemMarkupQT = parseFloat(row.querySelector(".markupSO").value);
      const itempriceCostQT = parseFloat(
        row.querySelector(".priceCostSO").value
      );
      const itemProductType = row.querySelector(".productTypeSO").value;
      //step 3 - get all item fields
      if (itemName && itemQty) {
        // let piecePrice = itempriceCostQT;
        // if(itemMarkupQT > 0){
        //   const result = itempriceCostQT * itemMarkupQT / 100;
        //   piecePrice = piecePrice + result;
        // }
        items.push({
          //user zoho creator item filds name
          Sr_No: index + 1,
          Item: itemName,
          Qty: itemQty,
          Description: itemDescription,
          Unit: itemUnitQT,
          Piece_cost: itempriceCostQT,
          Margin: itemMarkupQT,
          //Piece_price:piecePrice,
          Product_Type1: itemProductType,
          // Amount:piecePrice * itemQty
        });
      }
    });
    return items;
  }
  // Handle form submission
  document.getElementById("soBtn").addEventListener("click", (event) => {
    //
    //file upload private attachment
    //   const fileInput = document.getElementById("fileInput");
    //   const files = fileInput.files;
    //   const fileUploads = [];
    //   if (files.length !== 0) {
    //     for (let i = 0; i < files.length; i++) {
    //       const file = files[i];
    //       fileUploads.push(file);
    //       console.log(file);
    //     }
    //   }
    //file upload private attachment
    window.genrateDate = (addtoMonth = 0, activeFormat = false) => {
      const now = new Date();
      let month = now.getMonth() + 1;
      month = month + addtoMonth;
      let day = now.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      const months = [
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
      const selectedDate = now.getFullYear() + "-" + month + "-" + day;
      const month1 = months[new Date(selectedDate).getMonth()];
      const day1 = selectedDate.substring(8, 10);
      const year1 = selectedDate.substring(-1, 4);
      const formatTime = activeFormat ? "00:00:00" : "";
      const formatedDate = `${day1}-${month1}-${year1} ${formatTime}`;
      return formatedDate;
    };
    //validations
    const errorMessageSo = document.querySelector("#errorMessageSo");
    //
    const SOName = document.getElementById("SOName").value;
    const Tax_rate_value = document.getElementById("taxRateSO").value;
    const selectedPost = document.getElementById("Post_Production_dropdown_SO");
    const Post_Production_dropdown_SO =
      selectedPost.options[selectedPost.selectedIndex].text;
    const venddorInputSo = document.getElementById("vendorInputSO").value;
    const DidCustomerProvidePO = document.getElementById("customerPOSO").value;
    const PermitNeededSO = document.getElementById("permitNeededSO").value;
    const PO_Number = document.getElementById("poNumberSO1").value;
    const DesignProofNeededSO = document.getElementById("designProofSO").value;
    const SiteSurveyNeededSO = document.getElementById("siteSurveySO").value;
    const NoteSO = document.getElementById("notesSO").value;
    const privateNoteSO = document.getElementById("privateNotesSO").value;
    const leadTime = document.getElementById("leadTimeSO").value;
    const Down_Payment_SO = document.getElementById(
      "downPaymentPercentSO"
    ).value;
    //alert("Button is clicked");
    const Our_Commitment_Date =
      document.getElementById("commitmentDateSO").value;
    const Customer_due_date_SO = document.getElementById(
      "Customer_due_date_SO"
    ).value;
    const approvedOnSO = document.getElementById("approvedOnSO").value;
    //
    //deliverOurVehicle_SO
    const SO_PO_DOV_addressLine1 = document.getElementById(
      "SO_PO_DOV_addressLine1"
    ).value;
    const SO_PO_DOV_addressLine2 = document.getElementById(
      "SO_PO_DOV_addressLine2"
    ).value;
    const SO_PO_DOV_city = document.getElementById("SO_PO_DOV_city").value;
    const SO_PO_DOV_state = document.getElementById("SO_PO_DOV_state").value;
    const SO_PO_DOV_zipCode =
      document.getElementById("SO_PO_DOV_zipCode").value;
    const SO_PO_DOV_deliveryDate = document.getElementById(
      "SO_PO_DOV_deliveryDate"
    ).value;
    //deliverRentedTruck_SO
    const SO_PO_DRT_vehicleNumber = document.getElementById(
      "SO_PO_DRT_vehicleNumber"
    ).value;
    const SO_PO_DRT_rentedDeliveryDate = document.getElementById(
      "SO_PO_DRT_rentedDeliveryDate"
    ).value;
    const aSO_PO_DRT_ddressLine1 = document.getElementById(
      "aSO_PO_DRT_ddressLine1"
    ).value;
    const SO_PO_DRT_addressLine2 = document.getElementById(
      "SO_PO_DRT_addressLine2"
    ).value;
    const SO_PO_DRT_city = document.getElementById("SO_PO_DRT_city").value;
    const SO_PO_DRT_state = document.getElementById("SO_PO_DRT_state").value;
    const SO_PO_DRT_zipCode =
      document.getElementById("SO_PO_DRT_zipCode").value;
    //customerPickup_SO
    const SO_PO_CP_knowWhoIsPickingUp = document.getElementById(
      "SO_PO_CP_knowWhoIsPickingUp"
    ).value;
    const SO_PO_CP_knowWhenPickup = document.getElementById(
      "SO_PO_CP_knowWhenPickup"
    ).value;
    const SO_PO_CP_pickupName = document.getElementById(
      "SO_PO_CP_pickupName"
    ).value;
    const SO_PO_CP_pickupDate = document.getElementById(
      "SO_PO_CP_pickupDate"
    ).value;
    //dropship_SO
    const SO_PO_DS_addressLine1 = document.getElementById(
      "SO_PO_DS_addressLine1"
    ).value;
    const SO_PO_DS_addressLine2 = document.getElementById(
      "SO_PO_DS_addressLine2"
    ).value;
    const SO_PO_DS_city = document.getElementById("SO_PO_DS_city").value;
    const SO_PO_DS_state = document.getElementById("SO_PO_DS_state").value;
    const SO_PO_DS_whereWillitShip = document.getElementById(
      "SO_PO_DS_whereWillitShip"
    ).value;
    //upsFedexOurAccount_SO
    const SO_PO_UFOA_ourAccount = document.getElementById(
      "SO_PO_UFOA_ourAccount"
    ).value;
    const SO_PO_UFOA_nextdayshippment = document.getElementById(
      "SO_PO_UFOA_nextdayshippment"
    ).value;
    const SO_PO_UFOA_regulargroundshipment = document.getElementById(
      "SO_PO_UFOA_regulargroundshipment"
    ).value;
    const SO_PO_UFOA_chnagenormalmode = document.getElementById(
      "SO_PO_UFOA_chnagenormalmode"
    ).value;
    const SO_PO_UFOA_accountNumber = document.getElementById(
      "SO_PO_UFOA_accountNumber"
    ).value;
    const SO_PO_UFOA_needMultipleLocations = document.getElementById(
      "SO_PO_UFOA_needMultipleLocations"
    ).value;
    //upsFedexCustomerAccount_SO
    const SO_PO_UFCA_customeraccount = document.getElementById(
      "SO_PO_UFCA_customeraccount"
    ).value;
    const SO_PO_UFCA_needMultipleLocationsCustomer = document.getElementById(
      "SO_PO_UFCA_needMultipleLocationsCustomer"
    ).value;
    const SO_PO_UFCA_customerAccountNumber = document.getElementById(
      "SO_PO_UFCA_customerAccountNumber"
    ).value;
    //freightDelivery_SO
    const SO_PO_FD_palletSize = document.getElementById(
      "SO_PO_FD_palletSize"
    ).value;
    const SO_PO_FD_freightPickupArrangement = document.getElementById(
      "SO_PO_FD_freightPickupArrangement"
    ).value;
    const SO_PO_FD_freightPickupDate = document.getElementById(
      "SO_PO_FD_freightPickupDate"
    ).value;
    //Install_SO
    const ManufactureTypeSO =
      document.getElementById("ManufactureTypeSO").value;
    const InstallTypeSO = document.getElementById("InstallTypeSO").value;
    const SignPermitSO = document.getElementById("SignPermitSO").value;
    const ElectricalPermitSO =
      document.getElementById("ElectricalPermitSO").value;
    const ElectricalConnectionSO = document.getElementById(
      "ElectricalConnectionSO"
    ).value;
    const MissDigSO = document.getElementById("MissDigSO").value;
    console.log("MissDigSO information", MissDigSO);
    const Type_of_Work_Needed = document.getElementById(
      "Type_of_Work_Needed"
    ).value;
    const Install_Summary_of_Work = document.getElementById(
      "Install_Summary_of_Work"
    ).value;
    const Whta_type_of_Hardware_Specific = document.getElementById(
      "Whta_type_of_Hardware_Specific"
    ).value;
    const URL_Link1 = document.getElementById("URL_Link1").vlaue;
    const URL_Link2 = document.getElementById("URL_Link2").vlaue;
    const Preferred_Date_1SO =
      document.getElementById("Preferred_Date_1").value;
    const Preferred_Date_2SO =
      document.getElementById("Preferred_Date_2").value;
    const HasTheWallSO = document.getElementById("HasTheWallSO").value;
    const IsThereWorkingSO = document.getElementById("IsThereWorkingSO").value;
    const IsRentalSO = document.getElementById("IsRentalSO").value;
    const InHouseSO = document.getElementById("InHouseSO").value;
    const IsHardwareSO = document.getElementById("IsHardwareSO").value;
    const HardwareGradeSO = document.getElementById("HardwareGradeSO").value;
    const WhatFloorSO = document.getElementById("WhatFloorSO").value;
    const NumberOFVIsitSO = document.getElementById("HowManyInstallerSO").value;
    const HowManyInstallerSO =
      document.getElementById("HowManyInstallerSO").value;
    const AppproxFaSO = document.getElementById("AppproxFaSO").value;
    const EstimateHouerSO = document.getElementById("EstimateHouerSO").value;
    const EstimateHouerOnSO =
      document.getElementById("EstimateHouerOnSO").value;
    const ProductionDueSO = document.getElementById("ProductionDueSO").value;
    const FabricationDUeSO = document.getElementById("FabricationDUeSO").value;
    const InstallationDUeSO =
      document.getElementById("InstallationDUeSO").value;
    const InhouseEqupmentSO =
      document.getElementById("InhouseEqupmentSO").value;
    const AnyObstrictionSO = document.getElementById("AnyObstrictionSO").value;
    const RentalEquipmentSO =
      document.getElementById("RentalEquipmentSO").value;
    const PowerEquipmentSO = document.getElementById("PowerEquipmentSO").value;
    if (
      !SOName ||
      !Tax_rate_value ||
      !Post_Production_dropdown_SO ||
      !Our_Commitment_Date ||
      !Customer_due_date_SO ||
      !venddorInputSo ||
      !PermitNeededSO
    ) {
      errorMessageSo.style.display = "block";
    } else {
      errorMessageSo.style.display = "none";
      //urls
      const urlSo1 = document.getElementById("urlEs1SO").value;
      const urlSo2 = document.getElementById("urlEs2SO").value;
      const urlSo3 = document.getElementById("urlEs3SO").value;
      const urlarraySo = [urlSo1, urlSo2, urlSo3];
      const filteredUrlsSo = urlarraySo.filter((url) => url);
      const urlsSo = filteredUrlsSo.map((url) => {
        return {
          Url: {
            url,
          },
        };
      });
      //endurls
      // Define the connection name
      const conn_name = "crmwidgetconnection";
      // Construct the payload
      const payloadData = {
        Tax_rate: Tax_rate_value,
        SO_name: SOName,
        Post_production: Post_Production_dropdown_SO,
        Status: "Draft",
        Source: "Widget",
        Estimate: window.selectedEstimateID,
        Reference_URL: urlsSo,
        Down_Payment: Down_Payment_SO,
        SO_Date: window.genrateDate(0, true),
        Did_customer_provide_a_customer_PO: DidCustomerProvidePO,
        PO_Number: PO_Number,
        CRM_Account_Name: window.accountId,
        Vendor_Number: window.vendorName,
        Notes: NoteSO,
        Private_Notes_widget: privateNoteSO,
        Lead_time_from_approval_Business_Days: leadTime,
        Widget_CRM_Contact_Name: window.contactNameSO,
        Salesperson_Lookup: window.salespersonIDSO,
        //skip_workflow: ["all"],
        Shipping_Name: window.shippingNameSO,
        Billing_Name: window.accountName,
        Phone_Number: window.shippingphoneFieldsSO,
        Item_Details: getItemsSO(),
        Ship_To: {
          address_line_1: window.shippingStreetFieldSO,
          address_line_2: window.shippingStreetLine2FieldSO,
          district_city: window.shippingCityFieldSO,
          state_province: window.shippingStateFieldSO,
          postal_Code: window.shippingCodeFieldSO,
        },
        Bill_To: {
          address_line_1: window.billingStreetFieldSO,
          postal_Code: window.billingCodeFieldSO,
          district_city: window.billingCityFieldSO,
          state_province: window.billingStateFieldSO,
        },
        //
        Delivery_address: {
          address_line_1: SO_PO_DOV_addressLine1,
          address_line_2: SO_PO_DOV_addressLine2,
          district_city: SO_PO_DOV_city,
          state_province: SO_PO_DOV_state,
          postal_Code: SO_PO_DOV_zipCode,
        },
        Vehicle_number: SO_PO_DRT_vehicleNumber,
        Delivery_Address_rented_truck: {
          address_line_1: aSO_PO_DRT_ddressLine1,
          address_line_2: SO_PO_DRT_addressLine2,
          district_city: SO_PO_DRT_city,
          state_province: SO_PO_DRT_state,
          postal_Code: SO_PO_DRT_zipCode,
        },
        Do_we_know_who_is_picking_up: SO_PO_CP_knowWhoIsPickingUp,
        Do_we_know_when_will_customer_pickup: SO_PO_CP_knowWhenPickup,
        Name: SO_PO_CP_pickupName,
        Ship_to_address: {
          address_line_1: SO_PO_DS_addressLine1,
          address_line_2: SO_PO_DS_addressLine2,
          district_city: SO_PO_DS_city,
          state_province: SO_PO_DS_state,
        },
        Where_will_it_ship_from: SO_PO_DS_whereWillitShip,
        Our_Account: SO_PO_UFOA_ourAccount,
        Next_day_shipment_needed: SO_PO_UFOA_nextdayshippment,
        Regular_Ground_shipment: SO_PO_UFOA_regulargroundshipment,
        Charge_normal_markup: SO_PO_UFOA_chnagenormalmode,
        Account_Numer: SO_PO_UFOA_accountNumber,
        Need_Multiple_Locations_Send_UPS_Our_Account:
          SO_PO_UFOA_needMultipleLocations,
        Pallet_size_needed_provide_estimate: SO_PO_FD_palletSize,
        Who_will_arrange_freight_pickup: SO_PO_FD_freightPickupArrangement,
        Need_Multiple_Locations_Send_UPS_customer:
          SO_PO_UFCA_needMultipleLocationsCustomer,
        //install
        Manufacture_Type: ManufactureTypeSO,
        Install_type: InstallTypeSO,
        Electrical_connection_made_by_us: ElectricalConnectionSO,
        Miss_DIG_required1: MissDigSO,
        Type_of_Work_Needed: Type_of_Work_Needed,
        Install_Summary_of_Work: Install_Summary_of_Work,
        Has_the_wall_recently_been_painted: HasTheWallSO,
        Is_there_a_working_elevator_available: IsThereWorkingSO,
        Is_rental_equipment_needed: IsRentalSO,
        In_house_large_equipment_needed: InHouseSO,
        Is_hardware_needed: IsHardwareSO,
        Hardware_grade: HardwareGradeSO,
        What_floor_s_will_Signage_be_installed: WhatFloorSO,
        Number_of_Visits_needed: NumberOFVIsitSO,
        How_many_installers_needed2: HowManyInstallerSO,
        Appprox_fabrication_time_Hours: AppproxFaSO,
        Estimated_hours_of_travel: EstimateHouerSO,
        Estimated_hours_on_site: EstimateHouerOnSO,
        Whta_type_of_Hardware_Specific: Whta_type_of_Hardware_Specific,
        URL_Link1: URL_Link1,
        URL_Link2: URL_Link2,
        // :InhouseEqupmentSO,
        // :AnyObstrictionSO,
        // :RentalEquipmentSO,
        // :PowerEquipmentSO,
        //Preferred_Time this field Data type is Time
      };
      //
      if (venddorInputSo) payloadData.Vendor_input_need = venddorInputSo;
      if (PermitNeededSO) payloadData.Permit_needed = PermitNeededSO;
      //
      if (SignPermitSO) payloadData.Sign_permit_required = SignPermitSO;
      if (ElectricalPermitSO)
        payloadData.Electrical_Permit_required = ElectricalPermitSO;
      //
      if (approvedOnSO) payloadData.Approved_On = formatDate(approvedOnSO);
      if (Our_Commitment_Date)
        payloadData.Our_Commitment_Date = formatDate(Our_Commitment_Date);
      if (Customer_due_date_SO)
        payloadData.Customer_due_date = formatDate(Customer_due_date_SO);
      if (DesignProofNeededSO)
        payloadData.is_Design_Proof_needed = DesignProofNeededSO;
      if (SiteSurveyNeededSO)
        payloadData.Site_Survey_Needed = SiteSurveyNeededSO;
      //
      if (SO_PO_DOV_deliveryDate)
        payloadData.Desired_delivery_date = formatDate(SO_PO_DOV_deliveryDate);
      if (SO_PO_DRT_rentedDeliveryDate)
        payloadData.Desired_delivery_date_Rented_truck = formatDate(
          SO_PO_DRT_rentedDeliveryDate
        );
      if (SO_PO_CP_pickupDate)
        payloadData.PickUp_Date = formatDate(SO_PO_CP_pickupDate);
      if (SO_PO_FD_freightPickupDate)
        payloadData.Date_of_freight_pickup_required_to_meet_customer_due_date =
          formatDate(SO_PO_FD_freightPickupDate);
      if (ProductionDueSO)
        payloadData.Production_due_date = formatDate(ProductionDueSO);
      if (FabricationDUeSO)
        payloadData.Fabrication_due_date = formatDate(FabricationDUeSO);
      if (InstallationDUeSO)
        payloadData.Installation_due_date = formatDate(InstallationDUeSO);
      if (Preferred_Date_1SO)
        payloadData.Preferred_Date_1 = formatDate(Preferred_Date_1SO);
      if (Preferred_Date_2SO)
        payloadData.Preferred_Date_2 = formatDate(Preferred_Date_2SO);
      const payload = {
        parameters: {
          data: payloadData,
        },
        method: "POST",
        url: "https://www.zohoapis.com/creator/v2.1/data/sst1source/source-erp/form/Salesorder_2_0",
        param_type: 2,
      };
      // Invoke the connection to create the parent record
      ZOHO.CRM.CONNECTION.invoke(conn_name, payload)
        .then(function (response) {
          console.log("Connection Response:", response);
          // Retrieve the parent record ID
          const recordID = response.details.statusMessage.data.ID;
          console.log("Record ID:", recordID);
          if (response.code === "SUCCESS") {
            //alert("Record created successfully in Zoho Creator.");
            Swal.fire({
              title: "Record Submitted",
              text: "Thank you",
              icon: "success",
            });
            ////Create subform records under the parent record
            // const subformPayload = {
            //   parameters: {
            //     data: {
            //       File_Descprition: "Subform file description example.",
            //       Estimate_2_0_Private_Attachment: recordID, // Associate with parent record
            //     },
            //   },
            //   method: "POST",
            //   url: "https://www.zohoapis.com/creator/v2.1/data/sst1source/source-erp/form/Estimate_2_0_File_Upload",
            //   param_type: 2,
            // };
            ////Invoke connection for each subform record
            // ZOHO.CRM.CONNECTION.invoke(conn_name, subformPayload)
            //   .then(function (subformResponse) {
            //     console.log("Subform Record Response:", subformResponse);
            //     const recordID = subformResponse.details.statusMessage.data.ID;
            //     console.log(recordID);
            //     if (subformResponse.code === "SUCCESS") {
            //       //alert("Subform record created successfully.");
            //       //upload the files into subform record
            //     } else {
            //       alert(
            //         "Failed to create subform record: " +
            //           subformResponse.message
            //       );
            //     }
            //   })
            //   .catch(function (subformError) {
            //     console.error("Error creating subform record:", subformError);
            //     alert("An error occurred while creating the subform record.");
            //   });
          } else {
            alert("Failed to create record: " + response.message);
          }
        })
        .catch(function (error) {
          console.error("Error invoking connection:", error);
          alert("An error occurred while creating the record.");
        });
      setTimeout(() => {
        location.reload();
      }, 6000);
    } //End of else block for validations
  }); //click event end
}); //end of DOMContentLoaded
ZOHO.embeddedApp.init();
