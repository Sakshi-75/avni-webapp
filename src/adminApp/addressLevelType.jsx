import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  FunctionField,
  List,
  number,
  ReferenceField,
  required,
  SaveButton,
  SimpleForm,
  TextField,
  Toolbar,
  useRecordContext,
  TopToolbar,
  CreateButton,
  useListContext,
} from "react-admin";
import { None } from "../common/components/utils";
import { isNil } from "lodash";
import { Title } from "./components/Title";
import { DocumentationContainer } from "../common/components/DocumentationContainer";
import { AvniTextInput } from "./components/AvniTextInput";
import { Box, Paper, Typography } from "@mui/material";
import { AvniReferenceInput } from "./components/AvniReferenceInput";
import { createdAudit, modifiedAudit } from "./components/AuditUtil";
import { CustomExportButton } from "./components/CustomExportButton";
import { ToolTipContainer } from "../common/components/ToolTipContainer";
import {
  datagridStyles,
  StyledBox,
  StyledSelectInput,
  StyledShow,
  StyledSimpleShowLayout,
} from "./Util/Styles";
import { PrettyPagination } from "./Util/PrettyPagination.tsx";

const LocationTypeListActions = () => {
  const { resource } = useListContext();

  const locationTypeFields = [
    { source: "id", label: "ID" },
    { source: "uuid", label: "UUID" },
    { source: "name", label: "Location Type" },
    { source: "level", label: "Level" },
    { source: "parentId", label: "Parent ID" },
    { source: "organisationId", label: "Organisation ID" },
    { source: "voided", label: "Voided" },
    { source: "version", label: "Version" },
    { source: "createdBy", label: "Created By" },
    { source: "lastModifiedBy", label: "Last Modified By" },
    { source: "createdDateTime", label: "Created Date Time" },
    { source: "lastModifiedDateTime", label: "Last Modified Date Time" },
  ];

  return (
    <TopToolbar>
      <CreateButton />
      <CustomExportButton fields={locationTypeFields} resource={resource} />
    </TopToolbar>
  );
};

export const LocationTypeList = (props) => (
  <StyledBox>
    <List
      {...props}
      title="Location Types"
      sort={{ field: "level", order: "DESC" }}
      pagination={<PrettyPagination />}
      actions={<LocationTypeListActions />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false} sx={datagridStyles}>
        <TextField label="Location Type" source="name" />
        <TextField label="Level" source="level" />
        <ReferenceField
          label="Parent"
          source="parentId"
          reference="addressLevelType"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
      </Datagrid>
    </List>
  </StyledBox>
);

const ParentReferenceField = ({ showToolTip, ...props }) => {
  const Container = showToolTip ? ToolTipContainer : Box;
  const containerProps = showToolTip
    ? { toolTipKey: "ADMIN_LOCATION_TYPE_PARENT" }
    : {};
  const record = useRecordContext();

  const parentId = record?.parentId;

  if (isNil(parentId)) {
    return <None />;
  }

  return (
    <Container {...containerProps}>
      <ReferenceField
        {...props}
        source={"parentId"}
        link="show"
        reference="addressLevelType"
      >
        <FunctionField render={(record) => record.name} />
      </ReferenceField>
    </Container>
  );
};

const CreatedAuditField = () => {
  const record = useRecordContext();
  return createdAudit(record);
};

const ModifiedAuditField = () => {
  const record = useRecordContext();
  return modifiedAudit(record);
};

export const LocationTypeDetail = (props) => (
  <StyledShow {...props} title={<Title title={"Location Type"} />}>
    <StyledSimpleShowLayout>
      <TextField label="Location Type" source="name" />
      <TextField label="Level" source="level" />
      <ParentReferenceField label="Parent Type" />
      <CreatedAuditField label="Created" />
      <ModifiedAuditField label="Modified" />
      <TextField source="uuid" label="UUID" />
    </StyledSimpleShowLayout>
  </StyledShow>
);

const CreateEditToolbar = ({ edit, ...props }) => (
  <Toolbar {...props}>
    <SaveButton />
    {edit && <DeleteButton mutationMode="pessimistic" sx={{ ml: "auto" }} />}
  </Toolbar>
);

const LocationTypeForm = ({ edit, ...props }) => {
  return (
    <SimpleForm
      toolbar={<CreateEditToolbar edit={edit} />}
      {...props}
      redirect="show"
    >
      <AvniTextInput
        source="name"
        label="Name"
        validate={required()}
        toolTipKey={"ADMIN_LOCATION_TYPE_NAME"}
      />
      <AvniTextInput
        source="level"
        label="Level"
        validate={[required(), number()]}
        toolTipKey={"ADMIN_LOCATION_TYPE_LEVEL"}
      />
      {edit ? (
        <>
          <Typography sx={{ color: "text.secondary" }}>
            {" "}
            Parent Type{" "}
          </Typography>
          <ParentReferenceField label="Parent Type" showToolTip={true} />
        </>
      ) : (
        <AvniReferenceInput
          source="parentId"
          reference="addressLevelType"
          label="Parent"
          toolTipKey={"ADMIN_LOCATION_TYPE_PARENT"}
        >
          <StyledSelectInput optionText="name" resettable />
        </AvniReferenceInput>
      )}
    </SimpleForm>
  );
};

export const LocationTypeCreate = (props) => (
  <Paper>
    <DocumentationContainer filename={"LocationType.md"}>
      <Create
        {...props}
        redirect="show"
        title="Add New Location Type"
        mutationMode="pessimistic"
      >
        <LocationTypeForm />
      </Create>
    </DocumentationContainer>
  </Paper>
);

export const LocationTypeEdit = (props) => (
  <Edit
    {...props}
    title="Edit Location Type"
    redirect="show"
    mutationMode="pessimistic"
  >
    <LocationTypeForm edit />
  </Edit>
);
