const Link = require('../models/Link');

const redirect = async (req, res) => {
  const { title } = req.params;
  const doc = await Link.findOneAndUpdate({ title });

  try {
    // console.log(doc)
    return res.redirect(doc.url);
  } catch (error) {
    return res.status(404).send(`Houve um erro ${error}`);
  }
}

const linkAdd = async (req, res) => {
  const link = new Link(req.body);
  const doc = await link.save();
  try {
    return res.redirect('/');
  } catch(error) {
    return res.render('add', { error, body: req.body });
  }
}

const allLinks = async (_req, res) => {
  const doc = await Link.find();

  try {
    return res.render('all', { doc });
  } catch(error) {
    return res.status(404).send(error.message);
  }
}

const deleteLink = async (req, res) => {
  const { id } = req.params;
  // Link.deleteOne{_id: id} Outra forma de deletar
  // documentos.
  
  try {
    await Link.findByIdAndDelete(id);
    res.send(id);
  } catch(error) {
    return res.status(404).send(error);
  }
}

const loadLink = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Link.findById(id);
    res.render('edit', { error: false, body: doc })  
  } catch (error) {
    res.status(404).send(error);
  }
}

const editLink = async (req, res) => {
  let link = {};
  link.title = req.body.title;
  link.description = req.body.description;
  link.url = req.body.url;

  let id = req.params.id;

  if (!id) {
    id = req.body.id;
  }

  try {
    let doc = await Link.updateOne({ _id: id }, link);
    res.redirect('/')
  } catch (error) {
    res.render('edit', { error, body: req.body});
  }
}

module.exports = { 
  redirect,
  linkAdd,
  allLinks,
  deleteLink,
  loadLink,
  editLink
};