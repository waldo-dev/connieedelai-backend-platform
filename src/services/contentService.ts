import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import { Content } from "../models/content";
import { ContentSection, Section, Module, ContentModule } from "../models";
import mime from "mime-types";
import { uploadFileToFirebase, generateUploadSignedUrl } from "./wasabiService";
import { v4 as uuidv4 } from "uuid";
import { Readable } from "stream";
import fs from "fs";
// import { getWasabiFileUrl } from "../services/wasabiService"; // o la ruta donde tengas la función
import { Storage } from "@google-cloud/storage";
import serviceAccountJson from "../config/connieedelai-c1edf-466220-3e8259af3da0.json";
import ContentSections from "../models/content_section";

const storage = new Storage({
  projectId: serviceAccountJson.project_id,
  credentials: serviceAccountJson,
});

const bucketName = "connieedelai-c1edf-466220.firebasestorage.app";
const bucket = storage.bucket(bucketName);

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
    console.log("🚀 ~ content:", content);

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

const put_content_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const dataPut = req.body;

    // Buscar el contenido en la base de datos
    const objectDB = await Content.findByPk(id);
    if (!objectDB) {
      return res.status(404).json({ message: "Contenido no encontrado" });
    }

    // Inicializamos valores que se pueden actualizar
    let updatedFields: any = { ...dataPut };

    // Procesar archivos si vienen
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files) {
      // Si viene imagen de vista previa
      console.log("🚀 ~ put_content_by_id ~ files:", files)
      if (files.prev_url && files.prev_url.length > 0) {
        const imageFile = files.prev_url[0];
        if (!imageFile.mimetype.startsWith("image/")) {
          return res.status(400).json({ message: "La vista previa debe ser una imagen" });
        }
        const imageExtension = mime.extension(imageFile.mimetype);
        const imageUniqueName = `${uuidv4()}.${imageExtension}`;
        const imagePathInStorage = `contents/images/${imageUniqueName}`;

        const imageUrl = await uploadFileToFirebase(
          imagePathInStorage,
          imageFile.buffer,
          imageFile.mimetype
        );

        updatedFields.prev_url = imageUrl;
      }
    }

    // Actualizar registro
    const updatedObject = await objectDB.update(updatedFields);

    return res.status(200).json(updatedObject);
  } catch (err) {
    console.error("Error al actualizar contenido:", err);
    return res.status(500).json({ message: "Error interno al actualizar" });
  }
};


export const post_content_with_upload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, type, is_downloadable, moduleId, prev_url, file } =
      req.body;
    // const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Validar que existe el archivo de vista previa (imagen)
    // if (!files || !files.prev_url || files.prev_url.length === 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Se requiere la imagen de vista previa" });
    // }

    // Extraer la imagen (prev_url)
    // const imageFile = files.prev_url[0];

    // Validar que es imagen
    // if (!imageFile.mimetype.startsWith("image/")) {
    //   return res
    //     .status(400)
    //     .json({ message: "El archivo de vista previa debe ser una imagen" });
    // }

    // const imageExtension = mime.extension(imageFile.mimetype);
    // const imageUniqueName = `${uuidv4()}.${imageExtension}`;
    // const imagePathInStorage = `contents/images/${imageUniqueName}`;

    // const imageUrl = await uploadFileToFirebase(
    //   imagePathInStorage,
    //   imageFile.buffer,
    //   imageFile.mimetype
    // );
    // console.log("🚀 ~ post_content_with_upload ~ imageUrl:", imageUrl);

    const contentCreated = await Content.create({
      title,
      description,
      type,
      is_downloadble: is_downloadable === "true",
      url: file,
      prev_url: prev_url,
      visible: true,
    });

    // Relacionar con módulo
    await ContentModule.create({
      content_id: contentCreated.id,
      module_id: moduleId,
    });

    return res.status(201).json(contentCreated);
  } catch (err) {
    console.error("Error al subir contenido:", err);
    return res.status(500).json({ message: "Error interno" });
  }
};

export const generate_upload_url = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filename, contentType } = req.body;
    if (!filename || !contentType) {
      return res.status(400).json({ error: "Falta filename o contentType" });
    }

    const url = await generateUploadSignedUrl(filename, contentType);
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generando URL" });
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

export const get_content_by_section = async ( 
  req: Request,
  res: Response,
  next: NextFunction
) => {
   try {
    const sectionId = req.params.id;  // Recibe el ID de la sección desde los parámetros de la URL.
    console.log("🚀 ~ get_content_by_section ~ sectionId:", sectionId)

    const sectionContent = await ContentSections.findOne({
      where: { section_id: sectionId }
    })
    // Buscar las secciones que coinciden con el ID de la sección
    const content = await Content.findByPk(sectionContent?.dataValues.content_id);
    
    if (!content) {
      return res.status(404).json({ message: "Contenido no encontrado" });
    }

    return res.status(200).json(content);
  } catch (err) {
    console.error("Error al obtener contenidos por sección:", err);
    return res.status(500).json({ message: "Error interno al obtener contenidos por sección" });
  }
};

export default {
  get_content_by_id,
  put_content_by_id,
  generate_upload_url,
  get_content,
  post_content,
  get_content_training,
  get_content_nutrition,
  get_content_training_by_id,
  get_content_nutrition_by_id,
  post_content_with_upload,
  delete_content_by_id,
  get_content_by_section
};
