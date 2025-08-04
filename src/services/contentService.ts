import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import { Content } from "../models/content";
import { ContentSection, Section, Module, ContentModule } from "../models";
import mime from "mime-types";
import { uploadFileToFirebase } from "./wasabiService";
import { v4 as uuidv4 } from "uuid";
import { Readable } from "stream";
import fs from "fs";
// import { getWasabiFileUrl } from "../services/wasabiService"; // o la ruta donde tengas la función

const get_content = async (req: Request, res: Response, next: NextFunction) => {
  const result = await Content.findAll();

  if (!result) return res.status(500).json();

  return res.status(200).json(result);
};

const post_content = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const contentBuilded = Content.build(data);
  const resultValidate = await contentBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const contentCreated: any = await contentBuilded
    .save()
    .catch((err: any) => ({ err }));

  if (contentCreated.err) res.status(409).json(contentCreated.err.errors);

  res.status(200).json(contentCreated);
};

const get_content_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    console.log("🚀 ~ id:", id);

    const content = await Content.findByPk(id);
    // if (!content) return res.status(404).json("content not found");
    let url = "";
    // if(content.url){
    //   url = getWasabiFileUrl(content.url);
    // }
    console.log("🚀 ~ content:", content);

    if (content) {
      content.url = url;
    }

    return res.status(200).json(content);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const get_content_training = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sections = await Section.findAll({
      where: { id: 1 },
      include: [
        {
          model: Content,
          through: { attributes: [] },
        },
      ],
    });

    const allContents = sections.flatMap(
      (section: any) => section.dataValues.contents
    );
    // Eliminar duplicados si un contenido está en múltiples secciones
    const uniqueContents = Array.from(
      new Map(allContents.map((c) => [c.id, c])).values()
    );

    return res.status(200).json(uniqueContents);
  } catch (err) {
    console.error("Error al obtener contenidos de entrenamiento:", err);
    return res.status(500).json({ message: "Error al obtener entrenamientos" });
  }
};

const get_content_training_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contentId = parseInt(req.params.id);
    if (isNaN(contentId))
      return res.status(400).json({ message: "ID inválido" });

    const section: any = await Section.findOne({
      where: { id: 1 },
      include: [
        {
          model: Content,
          where: { id: contentId },
          through: { attributes: [] },
        },
      ],
    });

    if (!section || !section.contents || section.contents.length === 0) {
      return res
        .status(404)
        .json({ message: "Contenido no encontrado en entrenamientos" });
    }

    return res.status(200).json(section);
  } catch (err) {
    console.error("Error al obtener contenidos de entrenamiento:", err);
    return res.status(500).json({ message: "Error al obtener entrenamientos" });
  }
};

const get_content_nutrition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sections = await Section.findAll({
      where: { id: 2 },
      include: [
        {
          model: Content,
          through: { attributes: [] },
        },
      ],
    });
    const allContents = sections.flatMap(
      (section: any) => section.dataValues.contents
    );
    console.log("🚀 ~ allContents:", allContents);

    // Eliminar duplicados si un contenido está en múltiples secciones
    const uniqueContents = Array.from(
      new Map(allContents.map((c: any) => [c.id, c])).values()
    );

    return res.status(200).json(uniqueContents);
  } catch (err) {
    console.error("Error al obtener contenidos de Nutricion:", err);
    return res.status(500).json({ message: "Error al obtener entrenamientos" });
  }
};

const get_content_nutrition_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contentId = parseInt(req.params.id);
    if (isNaN(contentId))
      return res.status(400).json({ message: "ID inválido" });

    const section: any = await Section.findOne({
      where: { id: 2 },
      include: [
        {
          model: Content,
          where: { id: contentId },
          through: { attributes: [] },
        },
      ],
    });

    if (!section || !section.contents || section.contents.length === 0) {
      return res
        .status(404)
        .json({ message: "Contenido no encontrado en entrenamientos" });
    }

    return res.status(200).json(section);
  } catch (err) {
    console.error("Error al obtener contenidos de entrenamiento:", err);
    return res.status(500).json({ message: "Error al obtener entrenamientos" });
  }
};

// const put_content_by_id = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//    const id = req.params.id;
//   const dataPut = req.body;

//   // Buscar el contenido en la base de datos
//   const objectDB = await Content.findByPk(id);
//   if (!objectDB) {
//     return res.status(404).json({ message: "Objeto no encontrado" });
//   }

//   // Validar si hay archivos para subir (podría ser uno o más archivos)
//   const files = req.files as Express.Multer.File[]; // Asegúrate de que req.files sea un array de archivos

//   // Si hay archivos, procesarlos
//   if (files && files.length > 0) {
//     // Inicializar URLs para los archivos
//     let videoOrPdfUrl: string | undefined;
//     let imageUrl: string | undefined;

//     // Separar archivos de video/PDF e imagen
//     const videoOrPdfFile = files.find(file => file.mimetype === 'application/pdf' || file.mimetype.startsWith('video/'));
//     const imageFile = files.find(file => file.mimetype.startsWith('image/'));

//     // Subida de archivo de video/PDF
//     if (videoOrPdfFile) {
//       const videoOrPdfExtension = mime.extension(videoOrPdfFile.mimetype);
//       const videoOrPdfUniqueName = `${uuidv4()}.${videoOrPdfExtension}`;
//       const videoOrPdfPathInWasabi = `contents/${videoOrPdfUniqueName}`;
//       const videoOrPdfFileStream = fs.createReadStream(videoOrPdfFile.path);
//       const videoOrPdfUploadResult = await uploadFileToFirebase(videoOrPdfPathInWasabi, videoOrPdfFileStream, videoOrPdfFile.mimetype);
//       fs.unlinkSync(videoOrPdfFile.path); // Limpiar archivo temporal
//       // videoOrPdfUrl = videoOrPdfUploadResult.Location;
//     }

//     // Subida de imagen
//     if (imageFile) {
//       const imageExtension = mime.extension(imageFile.mimetype);
//       const imageUniqueName = `${uuidv4()}.${imageExtension}`;
//       const imagePathInWasabi = `contents/images/${imageUniqueName}`;
//       const imageFileStream = fs.createReadStream(imageFile.path);
//       const imageUploadResult = await uploadFileToWasabi(imagePathInWasabi, imageFileStream, imageFile.mimetype);
//       fs.unlinkSync(imageFile.path); // Limpiar archivo temporal
//       imageUrl = imageUploadResult.Location;
//     }

//     // Actualizar el objeto en la base de datos, incluyendo nuevos URLs cuando están disponibles
//     const updatedData = {
//       ...dataPut,
//       ...(videoOrPdfUrl && { url: videoOrPdfUrl }), // Solo incluye url si existe
//       ...(imageUrl && { image_url: imageUrl }), // Solo incluye image_url si existe
//     };

//     const objectUpdated = await objectDB.update(updatedData).catch(err => {
//       return { err }; // Manejando el error
//     });

//     if ((objectUpdated as any).err) {
//       const { errors } = (objectUpdated as any).err;
//       return res.status(404).json(errors);
//     } else {
//       return res.status(200).json(objectUpdated);
//     }
//   } else {
//     // Si no hay archivos, simplemente actualiza el contenido existente
//     const objectUpdated = await objectDB.update(dataPut).catch(err => {
//       return { err }; // Manejando el error
//     });

//     if ((objectUpdated as any).err) {
//       const { errors } = (objectUpdated as any).err;
//       return res.status(404).json(errors);
//     } else {
//       return res.status(200).json(objectUpdated);
//     }
//   }
// };

export const post_content_with_upload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, type, is_downloadable, moduleId } = req.body;

    const files: any = req.files;

    if (!files || !moduleId) {
      return res.status(400).json({ message: "Faltan archivos o moduleId" });
    }

    // Encontrar archivos según tipo
    const videoOrPdfFile = files.file.find(
      (file: any) =>
        file.mimetype === "application/pdf" ||
        file.mimetype.startsWith("video/")
    );
    const imageFile = files.prev_url.find((file: any) =>
      file.mimetype.startsWith("image/")
    );

    if (!videoOrPdfFile || !imageFile) {
      return res
        .status(400)
        .json({ message: "Se requieren un archivo de video/PDF y una imagen" });
    }

    const videoOrPdfExtension = mime.extension(videoOrPdfFile.mimetype);
    const videoOrPdfUniqueName = `${uuidv4()}.${videoOrPdfExtension}`;
    const videoOrPdfPathInStorage = `contents/${
      type == "pdf" ? "pdf" : "video"
    }/${videoOrPdfUniqueName}`;

    const videoOrPdfUrl = await uploadFileToFirebase(
      videoOrPdfPathInStorage,
      videoOrPdfFile.buffer,
      videoOrPdfFile.mimetype
    );
    console.log(
      "🚀 ~ post_content_with_upload ~ videoOrPdfUrl:",
      videoOrPdfUrl
    );

    const imageExtension = mime.extension(imageFile.mimetype);
    const imageUniqueName = `${uuidv4()}.${imageExtension}`;
    const imagePathInStorage = `contents/images/${imageUniqueName}`;

    const imageUrl = await uploadFileToFirebase(
      imagePathInStorage,
      imageFile.buffer,
      imageFile.mimetype
    );
    console.log("🚀 ~ post_content_with_upload ~ imageUrl:", imageUrl);

    const contentCreated = await Content.create({
      title,
      description,
      type,
      is_downloadble: is_downloadable === "true",
      url: videoOrPdfUrl,
      prev_url: imageUrl,
      visible: true,
    });

    // Relacionar con módulo
    await ContentModule.create({
      content_id: contentCreated.id,
      module_id: moduleId,
    });

    return res.status(201).json(videoOrPdfUrl);
  } catch (err) {
    console.error("Error al subir contenido:", err);
    return res.status(500).json({ message: "Error interno" });
  }
};

export const delete_content_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contentId = parseInt(req.params.id);
    if (isNaN(contentId)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const content = await Content.findByPk(contentId);
    if (!content) {
      return res.status(404).json({ message: "Contenido no encontrado" });
    }

    // Eliminar relaciones en ContentModule
    await ContentModule.destroy({
      where: { content_id: contentId },
    });

    // Eliminar el contenido
    await content.destroy();

    return res
      .status(200)
      .json({ message: "Contenido eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar contenido:", err);
    return res
      .status(500)
      .json({ message: "Error interno al eliminar contenido" });
  }
};

export default {
  get_content_by_id,
  // put_content_by_id,
  get_content,
  post_content,
  get_content_training,
  get_content_nutrition,
  get_content_training_by_id,
  get_content_nutrition_by_id,
  post_content_with_upload,
  delete_content_by_id,
};
