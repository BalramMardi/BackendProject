export const readResource = (req, res) => {
  res.json({ message: "You can read this resource" });
};

export const writeResource = (req, res) => {
  res.json({ message: "You can write this resource" });
};

export const deleteResource = (req, res) => {
  res.json({ message: "You can delete this resource" });
};
