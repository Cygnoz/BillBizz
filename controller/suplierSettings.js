const Organization = require("../database/model/organization");
const Settings = require('../database/model/settings');

const dataExist = async (organizationId) => {
  const [organizationExists, settings] = await Promise.all([
    Organization.findOne({ organizationId }),
    Settings.findOne({ organizationId })  // Updated to use findOne for Settings
  ]);
  return { organizationExists, settings };
};

exports.updateSupplierCustomerSettings = async (req, res) => {
  try {
    // const { organizationId } = req.body;
    const { organizationId, id: userId, userName } = req.user;
    console.log("Supplier Settings:", req.body);
   
    // Clean the incoming data to remove empty/null values
    const cleanedData = cleanSupplierData(req.body);

    // Check if organization and settings exist
    const { organizationExists, settings } = await dataExist(organizationId);

    if (!organizationExists) {
      return res.status(404).json({ message: "Organization not found" });
    }

    if (!settings) {
      return res.status(404).json({ message: "Settings not found for the given organization" });
    }

    // Merge cleanedData into the existing settings object
    Object.assign(settings, cleanedData);
    // Save the updated settings document
    await settings.save();

    res.status(200).json("Supplier settings updated successfully");
  } catch (error) {
    console.error("Error updating supplier settings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to clean the data
function cleanSupplierData(data) {
  const cleanData = (value) => (value === null || value === undefined || value === "" || value === 0 ? undefined : value);
  return Object.keys(data).reduce((acc, key) => {
    acc[key] = cleanData(data[key]);
    return acc;
  }, {});
}
