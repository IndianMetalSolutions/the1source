"use strict";
//   function getItemsDO() {
//     const items = [];
//     const itemRows = document.querySelectorAll(".itemrowupdatedo");
//     console.log(itemRows);
//     itemRows.forEach((row) => {
//         const itemName = row.querySelector(".item-name-updatedo").value;
//         const itemQty = parseInt(row.querySelector(".item-code-updatedo").value);
//         const itemDescription = row.querySelector(".itemDescriptionDOUpdate").value;
//         const itemUnitQT = row.querySelector(".itemUnitDOUpdate").value;
//         const itemProductType = row.querySelector(".productTypeDOUpdate").value;
//         console.log();
//         //step 3 - get all item fields
//         if (itemName && itemQty) {
//             items.push({
//                 //user zoho creator item filds name
//                 Item_Name: itemName,
//                 Qty: itemQty,
//                 Description: itemDescription,
//                 Unit: itemUnitQT,
//                 Product_Type: itemProductType,
//             });
//         }
//     });
//     return items;
// }
document.addEventListener("DOMContentLoaded", async () => {
  // Ensure ZOHO SDK is initialized
  await ZOHO.embeddedApp.init();
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
  function getItemsDO() {
    const items = [];
    const itemRows = document.querySelectorAll(".itemrowupdatedo, .item-rowdo"); //include both existing and new rows
    console.log(itemRows);
    itemRows.forEach((row) => {
      const itemName =
        row.querySelector(".item-name-updatedo")?.value ||
        row.querySelector(".item-nameAddRowdo")?.value;
      const itemQty =
        row.querySelector(".item-code-updatedo")?.value ||
        row.querySelector(".item-codeAddRowdo")?.value;
      const itemDescription =
        row.querySelector(".itemDescriptionDOUpdate")?.value ||
        row.querySelector(".Description_AddRowdo")?.value;
      const itemUnitQT =
        row.querySelector(".itemUnitDOUpdate")?.value ||
        row.querySelector(".itemUnitAddRowdo")?.value;
      const itemProductType = row.querySelector(".productTypeDOUpdate")?.value;
      //|| row.querySelector(".productTypeAddRowdo")?.value;
      //step 3 - get all item fields
      if (itemName && itemQty) {
        items.push({
          //user zoho creator item filds name
          Item_Name: itemName,
          Qty: itemQty,
          Description: itemDescription,
          Unit: itemUnitQT,
          Product_Type: itemProductType,
        });
      }
    });
    return items;
  }
  //
  const updateButtondo = document.getElementById("DOupdateChanges");
  if (!updateButtondo) {
    console.error("Button with ID 'SOupdateChanges' not found.");
    return;
  }
  updateButtondo.addEventListener("click", async () => {
    //alert("Button is clicked");
    const DONameupdate = document.getElementById("donameUpdate")?.value;
    const postProductionUpdate = document.getElementById(
      "postProductionDOUpdate"
    )?.value;
    const noteUpdate = document.getElementById("notesUpdateDO")?.value;
    const privateNoteUpdate = document.getElementById(
      "privateNoteUpdateDO"
    )?.value;
    const Our_Commitment_Date = document.getElementById(
      "Our_Commitment_DateUpdateDO"
    ).value;
    const Customer_Due_Date = document.getElementById(
      "Customer_Due_DateUpdateDo"
    ).value;
    const DesginOrderStatus = document.getElementById("statusUpdateDO").value;
    //
    const divIDItemDO = document.getElementById("divIDItemDO");
    if (!divIDItemDO) {
      alert("Error: divIDItemDO not found.");
      return;
    }
    // Define the connection name
    const conn_name = "crmwidgetconnection";
    // Construct the payload
    const payload = {
      parameters: {
        data: {
          DO_Name: DONameupdate,
          Status: "Designer not Assigned",
          Source: "Widget",
          Our_Commitment_Date: formatDate(Our_Commitment_Date),
          Customer_due_date: formatDate(Customer_Due_Date),
          Status: DesginOrderStatus,
          // Order_Date: formatDate(order_Date),
          Post_production: postProductionUpdate,
          Private_Notes_widget: privateNoteUpdate,
          Notes: noteUpdate,
          Item_Details: getItemsDO(),
          //Reference_URL: urlsdo,
          //CRM_Account_Name: window.accountId,
          //Account_Name: window.accountName,
          //CRM_Contact_Name: window.contactNameDO,
          //Contact_Name: window.contactNameDO,
          //Salesorder_2_0: window.selectedSalesOrderID,
          //Salesperson: window.salespersonIDDO,
          //Estimate_2_0: window.selectedEstimateIDDO,
          //Design_Order_Reference: window.selectedDesignOrderID,
          //Design_Type: designTypeDO,
          //Private_Notes: PrivateNoteSO,
          //Assigned_Designer: window.selectedDesignerID,
          //skip_workflow: ["all"],
        },
      },
      method: "PATCH",
      url: `https://www.zohoapis.com/creator/v2.1/data/sst1source/source-erp/report/All_Design_Orders/${window.MainRecordIDfor_ItemDetailsdo}`,
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
    // setTimeout(() => {
    //     location.reload();
    //   }, 5000);
  }); //end of click event
}); //End of DOM
