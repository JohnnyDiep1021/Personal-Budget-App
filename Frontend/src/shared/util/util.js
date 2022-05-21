export const NAME_MINLENGTH = 2;
export const NAME_MAXLENGTH = 23;
export const USERNAME_MINLENGTH = 6;
export const USERNAME_MAXLENGTH = 36;
export const EMAIL_MINLENGTH = 3;
export const EMAIL_MAXLENGTH = 80;
export const DUMMY_ENVELOPES = [
  {
    envelopeId: "e1",
    category: "Mobile phone bill check",
    budget: 550,
    notes: [
      { note: "Requirement: Bring card id" },
      { note: "Payment: cash" },
      { note: "Location: Eglington" },
      { note: "Due date: 28-04-2022" },
    ],
  },
  {
    envelopeId: "e2",
    category: "Medical care",
    budget: 200,
    notes: [
      { note: "Requirement: Bring old prescription" },
      { note: "Appointment: 08-04-2022" },
      { note: "Location: " },
      { note: "" },
    ],
  },
  {
    envelopeId: "e3",
    category: "Shopping",
    budget: 200,
    notes: [
      { note: "Buy essential groceries" },
      { note: "" },
      { note: "" },
      { note: "" },
    ],
  },
  {
    envelopeId: "e4",
    category: "Travel",
    budget: 300,
    notes: [{ note: "" }, { note: "" }, { note: "" }, { note: "" }],
  },
];
