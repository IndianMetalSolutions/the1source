"use strict";
document.addEventListener("DOMContentLoaded", async () => {
  // Ensure ZOHO SDK is initialized
  await ZOHO.embeddedApp.init();

  function getItems() {
    const items = [];
    const itemRows = document.querySelectorAll(".itemrowupdate, .item-row"); // Include both existing and new rows
    itemRows.forEach((row) => {
      const itemName =
        row.querySelector(".item-name-update")?.value ||
        row.querySelector(".item-nameAddRowQT")?.value;
      const itemQty =
        row.querySelector(".item-code-update")?.value ||
        row.querySelector(".item-codeAddRowQT")?.value;
      const itemDescription =
        row.querySelector(".itemDescriptionQTUpdate")?.value ||
        row.querySelector(".Description_AddRowQT")?.value;
      const itemUnitQT =
        row.querySelector(".itemUnitQTUpdate")?.value ||
        row.querySelector(".itemUnitAddRowQT")?.value;
      const itemMarkupQT =
        row.querySelector(".markupQTUpdate")?.value ||
        row.querySelector(".markupAddRowQT")?.value;
      const itempriceCostQT =
        row.querySelector(".priceCostQTUpdate")?.value ||
        row.querySelector(".priceCostAddRowQT")?.value;
      const itemProductType = row.querySelector(".productTypeQTUpdate")?.value;
      //|| row.querySelector(".productTypeAddRowQT")?.value;
      if (itemName && itemQty) {
        items.push({
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
    //itemRows = "";
    return items;
  }
  //below function is working for updating items
  // function getItems() {
  //   const items = [];
  //   const itemRows = document.querySelectorAll(".itemrowupdate"); // Use querySelectorAll to get all matching elements
  //   console.log(itemRows);
  //   itemRows.forEach((row) => {
  //     const itemName = row.querySelector(".item-name-update").value;
  //     const itemQty = row.querySelector(".item-code-update").value;
  //     const itemDescription = row.querySelector(
  //       ".itemDescriptionQTUpdate"
  //     ).value;
  //     const itemUnitQT = row.querySelector(".itemUnitQTUpdate").value;
  //     const itemMarkupQT = row.querySelector(".markupQTUpdate").value;
  //     const itempriceCostQT = row.querySelector(".priceCostQTUpdate").value;
  //     const itemProductType = row.querySelector(".productTypeQTUpdate").value;
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
  //   // items.push({
  //   // Use Zoho Creator item fields name
  //   // Item: "itemName 777",
  //   // Qty: 9,
  //   // Description: itemDescription,
  //   // Unit: itemUnitQT,
  //   // Piece_cost: itempriceCostQT,
  //   // Margin: itemMarkupQT,
  //   // Product_Type1: itemProductType,
  //   //});
  //   return items;
  // }
  // Get button reference
  const updateButton = document.getElementById("QTupdateChanges");
  if (!updateButton) {
    console.error("Button with ID 'QTupdateChanges' not found.");
    return;
  }
  updateButton.addEventListener("click", async () => {
    const quoteNameupdate = document.getElementById("quoteNameUpdate")?.value;
    const postProductionUpdate = document.getElementById(
      "PostProductionUpdate"
    )?.value;
    const noteUpdate = document.getElementById("notesUpdate")?.value;
    const privateNoteUpdate =
      document.getElementById("privateNoteUpdate")?.value;
    const downPaymentPercentQTUpdate = document.getElementById(
      "downPaymentPercentQTUpdate"
    )?.value;
    const permitNeededQTUpdate = document.getElementById(
      "permitNeededQTUpdate"
    )?.value;
    const siteSurveyQTUpdate =
      document.getElementById("siteSurveyQTUpdate")?.value;
    const leadTimeQTUpadate =
      document.getElementById("leadTimeQTUpadate")?.value;
    //
    const divIDItemQT = document.getElementById("divIDItemQT");
    if (!divIDItemQT) {
      alert("Error: divIDItemQT not found.");
      return;
    }
    const QTID = divIDItemQT.getAttribute("data-id");
    // Define the connection name
    const conn_name = "crmwidgetconnection";
    // Construct the payload
    //console.log("QT ID From estimate update js",QTID);
    const payload = {
      parameters: {
        data: {
          Quote_name: quoteNameupdate,
          Post_production: postProductionUpdate,
          Notes: noteUpdate,
          Private_Notes_widget: privateNoteUpdate,
          Widget_Location_Name: "Kabul Location", //window.addressName,
          Item_Details: getItems(),
          Lead_time_from_approval_Days: leadTimeQTUpadate,
          //Widget_Location_Name: ,
          Down_Payment: downPaymentPercentQTUpdate,
          Site_Survey_Needed: siteSurveyQTUpdate,
          Permit_needed: permitNeededQTUpdate,
          //skip_workflow: ["all"],
        },
      },
      //
      method: "PATCH",
      url: `https://www.zohoapis.com/creator/v2.1/data/sst1source/source-erp/report/Estimate_2_0_Report/${window.MainRecordIDfor_ItemDetails}`,
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
          //
          Swal.fire({
            title: "Record Submitted",
            text: "Thank you",
            icon: "success",
          });
          //
          console.log("Record Updated Successfully:", response.details);

          // Automatically add a new row after successful update
          $("#addItem").click();
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
  }); //click event end
});
