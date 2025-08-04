import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import { Section, Content, Module, ContentModule } from "../models";
import mime from "mime-types";
import { uploadFileToFirebase } from "./wasabiService";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
// import { getWasabiFileUrl } from "../services/wasabiService"; // o la ruta donde tengas la función

const get_module = async (req: Request, res: Response, next: NextFunction) => {
  const result = await Module.findAll();

  if (!result) return res.status(500).json();

  return res.status(200).json(result);
};

const post_module = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...moduleData } = req.body;
    const file = req.file;

    // Validar si el archivo está presente
    if (!file) {
      return res.status(400).json({ message: "Falta archivo" });
    }

    // Obtener la extensión del archivo y crear un nombre único
    const extension = mime.extension(file.mimetype);
    const uniqueName = `${uuidv4()}.${extension}`;
    const pathInWasabi = `images/${uniqueName}`;

    // Subir el archivo a Wasabi
    const uploadResult = await uploadFileToFirebase(
      pathInWasabi,
      file.buffer,
      file.mimetype
    );

    // Obtener la URL de la imagen cargada
    const imageUrl = uploadResult;

    moduleData.prev_url = imageUrl;

    // Crear módulo
    const moduleBuilded = Module.build(moduleData);
    const resultValidate = await moduleBuilded
      .validate()
      .catch((err: ValidationError) => err);

    if ((resultValidate as ValidationError).errors)
      return res.status(409).json((resultValidate as ValidationError).errors);

    const moduleCreated: any = await moduleBuilded
      .save()
      .catch((err) => ({ err }));

    if (moduleCreated.err)
      return res.status(409).json(moduleCreated.err.errors);

    // Vincular con sección si se especifica
    if (moduleData.section_id) {
      const section = await Section.findByPk(moduleData.section_id);
      if (!section)
        return res.status(404).json({ message: "Sección no encontrada" });

      // Establecer relación en tabla intermedia
      await moduleCreated.addSection(section); // usa Sequelize belongsToMany
    }

    return res.status(200).json(moduleCreated);
  } catch (error) {
    console.error("Error al crear módulo:", error);
    return res.status(500).json({ message: "Error al crear módulo" });
  }
};

const get_module_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const module = await Module.findByPk(id, {
      include: [
        {
          model: Content,
          as: "contents", // debe coincidir con el alias `as` definido en la relación
        },
      ],
    });
    if (!module) return res.status(404).json("module not found");

    return res.status(200).json(module);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_module_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const image = req.file;
  if(image){
    const extension = mime.extension(image.mimetype);
    const uniqueName = `${uuidv4()}.${extension}`;
    const pathInWasabi = `images/${uniqueName}`;

    const uploadResult = await uploadFileToFirebase(
      pathInWasabi,
      image.buffer,
      image.mimetype
    );
    const imageUrl = uploadResult;

    dataPut.prev_url = imageUrl;
  }

  const objectDB = await Module.findByPk(id);

  if (!objectDB) return res.status(404).json("object not found");
  else {
    const objectUpdated = await objectDB
      .update(dataPut)
      .catch((err) => ({ err }));

    if ((objectUpdated as any).err) {
      const { errors } = (objectUpdated as any).err;
      return res.status(404).json(errors);
    } else return res.status(200).json(objectUpdated);
  }
};

const get_module_with_contents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const module = await Module.findByPk(id, {
      include: [
        {
          model: Content,
          as: "contents", // debe coincidir con el alias `as` definido en la relación
        },
      ],
    });

    if (!module)
      return res.status(404).json({ message: "Módulo no encontrado" });

    return res.status(200).json(module);
  } catch (error) {
    console.error("Error al obtener módulo con contenidos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const get_modules_by_difficulty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const difficulty = req.params.difficulty;

    const module = await Module.findAll({
      where: {
        difficulty: difficulty,
      },
      include: [
        {
          model: Content,
          as: "contents", // debe coincidir con el alias `as` definido en la relación
        },
      ],
    });

    if (!module)
      return res.status(404).json({ message: "Módulo no encontrado" });

    return res.status(200).json(module);
  } catch (error) {
    console.error("Error al obtener módulo con contenidos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const delete_module = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const moduleId = parseInt(req.params.id);
  if (isNaN(moduleId)) {
    return res.status(400).json({ message: "Id inválido" });
  }

  const module = await Module.findByPk(moduleId);
  if (!module) {
    return res.status(404).json({ message: "Contenido no encontrado" });
  }

  await ContentModule.destroy({
    where: { module_id: moduleId },
  });

  await module.destroy();

  return res.status(200).json({ message: "Contenido eliminado correctamente" });
};

export default {
  get_module_by_id,
  put_module_by_id,
  get_module,
  post_module,
  get_module_with_contents,
  get_modules_by_difficulty,
  delete_module,
};
