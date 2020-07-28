export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  res.setPreviewData({});
  return res.status(200).json({ ok: true });
};
