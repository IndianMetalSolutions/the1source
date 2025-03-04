//below code is working to create QT into Zoho Creator
"use strict";
// Ensure the DOM is loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  function getItems() {
    const items = [];
    const itemRows = document.querySelectorAll(".item-row"); // Use querySelectorAll to get all matching elements
    console.log(itemRows);
    itemRows.forEach((row) => {
      const itemName = row.querySelector(".item-name").value;
      const itemQty = row.querySelector(".item-code").value;
      const itemDescription = row.querySelector(".Description-QT").value;
      const itemUnitQT = row.querySelector(".itemUnitQT").value;
      const itemMarkupQT = row.querySelector(".markupQT").value;
      const itempriceCostQT = row.querySelector(".priceCostQT").value;
      const itemProductType = row.querySelector(".productTypeQT").value;
      //console.log("Rafi 333");
      console.log(itemName, itemQty, itemProductType); // Debugging log
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
  // Handle form submission
  document.getElementById("estimatebtn").addEventListener("click", (event) => {
    //validations
    const errorMessageEs = document.getElementById("errorMessageEs");
    //Required fields
    const Quote_name = document.getElementById("quoteNameQT").value;
    const Tax_rate_value = document.getElementById("taxRateQT").value;
    const PostProductionQT = document.getElementById("postProductionQT").value;
    if (!Quote_name || !Tax_rate_value || !PostProductionQT) {
      errorMessageEs.style.display = "block";
    } else {
      errorMessageEs.style.display = "none";
      // Check if accountName is populated
      if (!accountName) {
        alert(
          "Account Name is not loaded yet. Please wait a moment and try again."
        );
        console.error("Account Name is not available.");
        return;
      }
      // Extract form values
      document.getElementById("accountNameQT").value = window.accountName;
      document.getElementById("vendorNumberQT").value = window.vendorName;
      const NoteQT = document.getElementById("notesQT").value;
      const privateNoteQT = document.getElementById("privateNotesQT").value;
      const downPaymentPercentQT = document.getElementById(
        "downPaymentPercentQT"
      ).value;
      const leadTime = document.getElementById("leadTime").value;
      // //file upload private attachment
      // const fileInput = document.getElementById("fileInput");
      // const files = fileInput.files;
      // const fileUploads = [];
      // if (files.length !== 0) {
      //   for (let i = 0; i < files.length; i++) {
      //     const file = files[i];
      //     fileUploads.push(file);
      //     console.log(file);
      //   }
      // }
      // //file upload private attachment
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
      //alert("Button is clicked for QT");
      //urls
      const urlEs1 = document.getElementById("urlEs1").value;
      const urlEs2 = document.getElementById("urlEs2").value;
      const urlEs3 = document.getElementById("urlEs3").value;
      const urlarrayEs = [urlEs1, urlEs2, urlEs3];
      const filteredUrlsEs = urlarrayEs.filter((url) => url);
      const urlsEs = filteredUrlsEs.map((url) => {
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
      const payload = {
        parameters: {
          data: {
            Tax_rate_dropdown: Tax_rate_value,
            Quote_name: Quote_name,
            Post_production: PostProductionQT,
            Quote_approval: window.internalApprover,
            Approver1: window.ApproverID,
            Lead_time_from_approval_Days: leadTime,
            Status: "Draft",
            Source: "Widget",
            Quote_date: window.genrateDate(0, true),
            Expiry_Date: window.genrateDate(2, true),
            CRM_Account_Name: window.accountId,
            Account_Name_String: accountName,
            Vendor_Number: window.vendorName,
            Salesperson: window.salespersonID,
            Widget_CRM_Contact_Name: window.contactName,
            Widget_Location_Name: window.addressName,
            Notes: NoteQT,
            Private_Notes_widget: privateNoteQT,
            Down_Payment: downPaymentPercentQT,
            Item_Details: getItems(),
            Reference_URL: urlsEs,
            //
            Shipping_Name: window.shippingName || window.accountName,
            Billing_Name: window.accountName,
            Phone_Number: window.shippingphoneFields,
            Ship_To: {
              address_line_1: window.shippingStreetField,
              address_line_2: window.shippingStreetLine2Field,
              district_city: window.shippingCityField,
              state_province: window.shippingStateField,
              postal_Code: window.shippingCodeField,
            },
            Bill_To: {
              address_line_1: window.billingStreetField,
              postal_Code: window.Billing_Code,
              district_city: window.billingCityField,
              state_province: window.billingStateField,
            },
          },
        },
        method: "POST",
        url: "https://www.zohoapis.com/creator/v2.1/data/sst1source/source-erp/form/Estimate_2_0",
        param_type: 2, // Indicates that parameters are sent in the request body
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
      }, 8000);

    } //End of else block for validations
  }); //click event end
}); //end of DOMContentLoaded

ZOHO.embeddedApp.init();