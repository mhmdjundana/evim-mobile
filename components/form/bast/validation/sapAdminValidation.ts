import * as Yup from 'yup';

export const sapAdminBastEditSchema = Yup.object().shape({
  // po_no: Yup.string().nullable().required("Required"),
  // migo_or_ses: Yup.string().nullable().required("Required"),
  // gl_no: Yup
  //   .array()
  //   .of(
  //     Yup.string().nullable().required("Required"),
  //   )
  //   .nullable()
  //   .min(1, "Choose at least 1")
  //   .required("Required"),
  // wbs_no: Yup
  //   .array()
  //   .of(
  //     Yup.string().nullable().required("Required"),
  //   )
  //   .nullable()
  //   .min(1, "Choose at least 1")
  //   .required("Required"),

  // wbs_no:
  //   formData.company_code === "1492"
  //     ? Yup
  //       .array()
  //       .of(
  //         Yup.object().shape({
  //           label: Yup.string().nullable(),
  //           value: Yup.string().nullable().required("Required"),
  //         })
  //       )
  //       .nullable()
  //       .min(1, "Choose at least 1")
  //       .required("Required")
  //     : Yup.mixed().nullable(),
  // coscenter_no:
  //   formData.company_code === "1561"
  //     ? Yup
  //       .array()
  //       .of(
  //         Yup.object().shape({
  //           label: Yup.string().nullable(),
  //           value: Yup.string().nullable().required("Required"),
  //         })
  //       )
  //       .nullable()
  //       .min(1, "Choose at least 1")
  //       .required("Required")
  //     : Yup.mixed().nullable(),
  // po_no: Yup.mixed().nullable().required("Required"),
})