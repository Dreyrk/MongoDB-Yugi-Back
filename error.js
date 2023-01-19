const error = {
  notFound: { err: "Card not found" },
  dbGetError: { err: "Error retrieving data from database" },
  dbPostError: { err: "Error saving data" },
  Unauthorized: { err: "Unauthorized you must have a valid token" },
  noRights: { err: "Understood the request but not have the rights" },
  user: "please fill correctly the fields",
};

export default error;
