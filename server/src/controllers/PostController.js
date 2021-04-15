const Post = require("../models/Post");
const Tag = require("../models/Tag");
require("../models/Categoria");
const PostCategoria = require("../models/PostCategoria");
const PostTag = require("../models/PostTag");
const Comentario = require("../models/Comentario");

module.exports = {
  create: async (req, res) => {
    try {
      const { titulo, tituloLower, descricao, corpo, usuario, banner, categorias, tags } = req.body;
      console.log(req.body)
      const createdPost = await Post.create({
        titulo,
        tituloLower,
        descricao,
        corpo,
        banner,
        usuario,
      });
      const { _id } = createdPost;
      
      const createdTags = [];

      for (const tag of tags) {
        createdTags.push(await Tag.findOneOrCreate(tag, tag));
      }

      const tagIds = createdTags.map((tag) => tag._id);

      const parsedCatIds = categorias.map((catId) => ({
        catId,
        postId: _id,
      }));
      const parsedTagIds = tagIds.map((tagId) => ({ tagId, postId: _id }));

      await PostCategoria.create(parsedCatIds);
      await PostTag.create(parsedTagIds);

      res.json({ createdPostId: _id });
    } catch (erro) {
      console.log(erro);
      // HTTP 500: Internal Server Error
      res.status(500).send(erro);
    }
  },
  update: async (req, res) => {
    try {
      const { _id } = req.body;
      const { titulo, descricao, corpo, usuario } = req.body;
      const post = await Post.findByIdAndUpdate(_id, {
        titulo,
        descricao,
        corpo,
        usuario,
      });
      if (!post) {
        res.status(404).end();
      }
      await PostCategoria.deleteMany({ postId: _id });
      await PostTag.deleteMany({ postId: _id });

      const { categorias, tags } = req.body;
      const createdTags = [];

      for (const tag of tags) {
        createdTags.push(await Tag.findOneOrCreate(tag, tag));
      }

      const tagIds = createdTags.map((tag) => tag._id);

      const parsedCatIds = categorias.map((categoria) => ({
        catId: categoria,
        postId: _id,
      }));
      const parsedTagIds = tagIds.map((tagId) => ({ tagId, postId: _id }));

      await PostCategoria.create(parsedCatIds);
      await PostTag.create(parsedTagIds);

      res.json({ edited: true });
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  delete: async (req, res) => {
    try {
      const { _id } = req.body;
      // Encontra a post pelo seu id e retorna o objeto encontrado que foi excluído.
      const post = await Post.findByIdAndDelete(_id);
      if (!post) {
        //post encontrado e excluída.
        res.status(404).end(); // HTTP 204: No content
      }
      await PostCategoria.deleteMany({ postId: _id });
      await PostTag.deleteMany({ postId: _id });
      await Comentario.deleteMany({ postId: _id });
      res.status(200).json({ removed: true });
    } catch (erro) {
      console.log(erro);
      // HTTP 500: Internal Server Error
      res.status(500).send(erro);
    }
  },
  indexCatOrTag: async (req, res) => {
    try {
      const { id, type, limite, titulo } = req.query;
      const collections = {
        PostCategoria: "",
        PostTag: await PostTag.find({ tagId: id })
          .populate("postId")
          .sort({ postId: -1 }),
        PostName: await Post.find({
          tituloLower: { $regex: ".*" + titulo + ".*" },
        }).sort({ createdAt: -1 }),
      };
      if (limite) {
        collections.PostCategoria = await PostCategoria.find({ catId: id })
          .populate("postId")
          .limit(Number(limite))
          .sort({ postId: -1 });
      } else {
        collections.PostCategoria = await PostCategoria.find({ catId: id })
          .populate("postId")
          .sort({ postId: -1 });
      }
      const posts = collections[type];
      res.json(posts);
    } catch (erro) {
      console.log(erro);
      // HTTP 500: Internal Server Error
      res.status(500).send(erro);
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;

      const post = await Post.findById(id).populate({ path: "usuario" });
      if (!post) {
        res.status(404).end();
      }
      const categorias = await PostCategoria.find({ postId: id })
        .populate({ path: "catId", select: "titulo" })
        .select("catId");
      const tags = await PostTag.find({ postId: id })
        .populate({ path: "tagId", select: "titulo" })
        .select("tagId");

      const comentarios = await Comentario.find({ postId: id }).populate({
        path: "usuario",
      });

      res.json({ post, categorias, tags, comentarios });
    } catch (erro) {
      console.log(erro);
      // HTTP 500: Internal Server Error
      res.status(500).send(erro);
    }
  },
  visualizacao: async (req, res) => {
    try {
      const { _id } = req.body;
      const post = await Post.findByIdAndUpdate(_id, req.body);
      if (post) {
        //post encontrado e atualizado
        res.status(204).end(); // HTTP 204: No content
      } else {
        //Http 404: Not found.
        res.status(404).end();
      }
    } catch (erro) {
      console.log(erro);
      // HTTP 500: Internal Server Error
      res.status(500).send(erro);
    }
  },
  index: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  indexDestaques: async (req, res) => {
    try {
      const posts = await Post.find();
      const today = new Date();
      let currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      let filteredPosts = [],
        counterM = 1,
        counterY = 0;
      filteredPosts = posts.filter(
        (post) =>
          post.createdAt.getMonth() === currentMonth &&
          post.createdAt.getFullYear() === currentYear
      );

      while (filteredPosts.length < 4) {
        filteredPosts = posts.filter(
          (post) =>
            post.createdAt.getMonth() === currentMonth - counterM &&
            post.createdAt.getFullYear() === currentYear - counterY
        );
        if (currentMonth - counterM === 0) {
          currentMonth = 11;
          counterM = 0;
          counterY++;
        } else {
          counter++;
        }
      }

      const sortedByTitle = filteredPosts.sort((a, b) => {
        if (a.titulo > b.titulo) {
          return 1;
        }
        if (a.titulo < b.titulo) {
          return -1;
        }
        return 0;
      });

      const sortedAndFilteredPosts = sortedByTitle.sort((a, b) => {
        if (a.visualizacao < b.visualizacao) {
          return 1;
        }
        if (a.visualizacao > b.visualizacao) {
          return -1;
        }
        return 0;
      });

      res.json({
        bigPost: sortedAndFilteredPosts[0],
        postNews: [
          sortedAndFilteredPosts[1],
          sortedAndFilteredPosts[2],
          sortedAndFilteredPosts[3],
        ],
      });
    } catch (erro) {
      res.status(500).send(erro);
      console.log(erro);
    }
  },
};
