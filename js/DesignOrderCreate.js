//below code is working to create DO into Zoho Creator
"use strict";
document.addEventListener("DOMContentLoaded", () => {
  ////below is Date function and you can use it
  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "August",
      "September",
      "Octcober",
      "Nov",
      "Dec",
    ];
    const monthAbbreviation = monthNames[parseInt(month) - 1];
    return `${day}-${monthAbbreviation}-${year}`;
  }
  function getItemsDO() {
    const items = [];
    const itemRows = document.querySelectorAll(".item-rowDO");
    console.log(itemRows);
    itemRows.forEach((row) => {
      const itemName = row.querySelector(".item-nameDO").value;
      const itemQty = parseInt(row.querySelector(".item-codeDO").value);
      const itemDescription = row.querySelector(".Description-DO").value;

      const itemUnitQT = row.querySelector(".itemUnitDO").value;
      const itemProductType = row.querySelector(".productTypeDO").value;
      console.log();
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
  // Handle form submission
  document.getElementById("doBtn").addEventListener("click", (event) => {
    //// file upload private attachment
    //       const fileInput = document.getElementById("fileInputDO");
    //       const files = fileInput.files;
    //       const fileUploads = [];
    //       if (files.length !== 0) {
    //         for (let i = 0; i < files.length; i++) {
    //           const file = files[i];
    //           fileUploads.push(file);
    //           console.log(file);
    //         }
    //       }
    //    //// file upload private attachment
    //validation
    const errorMessageDO = document.querySelector("#errorMessageDO");
    //
    const DOName = document.getElementById("DOName").value;
    const Our_Commitment_Date = document.getElementById(
      "ourCommitmentDateDO"
    ).value;
    const Customer_Due_Date =
      document.getElementById("customerDueDateDO").value;
    const order_Date = document.getElementById("dateFielddo").value;
    const Post_Production_dropdown_DO =
      document.getElementById("postProductionDO").value;
    const privateNotesDO = document.getElementById("privateNotesDO").value;
    const Notes_DO = document.getElementById("notesDO").value;
    const statusDO = document.getElementById("statusDO").value;
    //const designTypeDO = document.getElementById("Design_Type").value
    //alert("Button is clicked");
    if (
      !DOName ||
      !Post_Production_dropdown_DO ||
      !Our_Commitment_Date ||
      !Customer_Due_Date
    ) {
      errorMessageDO.style.display = "block";
    } else {
      errorMessageDO.style.display = "none";
      //urls
      const urlEs1DO = document.getElementById("urlEs1DO").value;
      const urlEs2DO = document.getElementById("urlEs2DO").value;
      const urlEs3DO = document.getElementById("urlEs3DO").value;
      //endurls
      // Define the connection name
      const conn_name = "crmwidgetconnection";
      // Construct the payload
      const payload = {
        parameters: {
          data: {
            DO_Name: DOName,
            Status: statusDO,
            Source: "Widget",
            Our_Commitment_Date: formatDate(Our_Commitment_Date),
            Customer_due_date: formatDate(Customer_Due_Date),
            Order_Date: formatDate(order_Date),
            Post_production: Post_Production_dropdown_DO,
            Private_Notes_widget: privateNotesDO,
            Notes: Notes_DO,
            //Reference_URL: urlsdo,
            CRM_Account_Name: window.accountId,
            Account_Name: window.accountName,
            CRM_Contact_Name: window.contactNameDO,
            Contact_Name: window.contactNameDO,
            Salesorder_2_0: window.selectedSalesOrderID,
            Salesperson: window.salespersonIDDO,
            Estimate_2_0: window.selectedEstimateIDDO,
            Design_Order_Reference: window.selectedDesignOrderID,
            //Design_Type: designTypeDO,
            //Private_Notes: PrivateNoteSO,
            //Assigned_Designer: window.selectedDesignerID,
            Item_Details: getItemsDO(),
            //skip_workflow: ["all"],
          },
        },
        method: "POST",
        url: "https://www.zohoapis.com/creator/v2.1/data/sst1source/source-erp/form/Design_Order",
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
            //url
            const urlarray = [urlEs1DO, urlEs2DO, urlEs3DO];
            for (const url of urlarray) {
              if (url) {
                //Create reference url records under the parent record
                const RefrenceUrl = {
                  parameters: {
                    data: {
                      Design_Order: recordID,
                      Description: url,
                      // Url: {
                      //   url,
                      // },
                    },
                  },
                  method: "POST",
                  url: "https://www.zohoapis.com/creator/v2.1/data/sst1source/source-erp/form/DesignOrder_Reference_URL",
                  param_type: 2,
                };
                //Invoke connection for each subform record
                ZOHO.CRM.CONNECTION.invoke(conn_name, RefrenceUrl)
                  .then(function (RefrenceurlData) {
                    console.log(
                      "Reference URL Record Response:",
                      RefrenceurlData
                    );
                    const recordID =
                      RefrenceurlData.details.statusMessage.data.ID;
                    console.log(recordID);
                    if (RefrenceurlData.code === "SUCCESS") {
                      //alert("Url record created successfully.");
                    } else {
                      alert(
                        "Failed to create Reference Url record: " +
                        RefrenceurlData.message
                      );
                    }
                  })
                  .catch(function (RefrenceurlDataerror) {
                    console.error(
                      "Error creating subform record:",
                      RefrenceurlDataerror
                    );
                    alert(
                      "An error occurred while creating the Reference url record."
                    );
                  });
                //Above code is to Add Reference url
              } //if condition for reference url
            } // for loop condition for referenc url
            //above code is for Reference URL
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
