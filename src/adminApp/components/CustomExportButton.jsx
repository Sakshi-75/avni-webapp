import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { useListContext } from "react-admin";
import { downloadCSV } from "react-admin";
import jsonExport from "jsonexport/dist";

export const CustomExportButton = ({ fields, resource, label = "Export" }) => {
  const [open, setOpen] = useState(false);
  const { data, total } = useListContext();

  // Get all available fields from the first record
  const allAvailableFields =
    data && data.length > 0
      ? Object.keys(data[0]).map((key) => ({ source: key, label: key }))
      : fields || [];

  const [selectedFields, setSelectedFields] = useState(() =>
    allAvailableFields.reduce(
      (acc, field) => ({ ...acc, [field.source]: true }),
      {},
    ),
  );

  const handleToggle = (fieldSource) => {
    setSelectedFields((prev) => ({
      ...prev,
      [fieldSource]: !prev[fieldSource],
    }));
  };

  const handleSelectAll = () => {
    const allSelected = allAvailableFields.reduce(
      (acc, field) => ({ ...acc, [field.source]: true }),
      {},
    );
    setSelectedFields(allSelected);
  };

  const handleDeselectAll = () => {
    const noneSelected = allAvailableFields.reduce(
      (acc, field) => ({ ...acc, [field.source]: false }),
      {},
    );
    setSelectedFields(noneSelected);
  };

  const handleExport = () => {
    const fieldsToExport = allAvailableFields
      .filter((field) => selectedFields[field.source])
      .map((field) => field.source);

    const dataToExport = data.map((record) => {
      const filtered = {};
      fieldsToExport.forEach((field) => {
        filtered[field] = record[field];
      });
      return filtered;
    });

    jsonExport(dataToExport, (err, csv) => {
      downloadCSV(csv, resource);
    });

    setOpen(false);
  };

  return (
    <>
      <Button
        startIcon={<Download />}
        onClick={() => setOpen(true)}
        disabled={total === 0}
        size="small"
        sx={{ padding: "2px 5px" }}
      >
        {label}
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Select Fields to Export</DialogTitle>
        <DialogContent>
          <Button onClick={handleSelectAll} size="small" sx={{ mb: 2 }}>
            Select All
          </Button>
          <Button
            onClick={handleDeselectAll}
            size="small"
            sx={{ mb: 2, ml: 1 }}
          >
            Deselect All
          </Button>
          <FormGroup>
            {allAvailableFields.map((field) => (
              <FormControlLabel
                key={field.source}
                control={
                  <Checkbox
                    checked={!!selectedFields[field.source]}
                    onChange={() => handleToggle(field.source)}
                  />
                }
                label={field.label}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleExport} variant="contained" color="primary">
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
