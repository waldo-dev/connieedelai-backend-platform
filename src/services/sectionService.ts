import { Request, Response, NextFunction } from "express";
import { FindOptions, ValidationError } from "sequelize";
import { Section, Module, Content } from "../models";

const get_section = async (req: Request, res: Response, next: NextFunction) => {

  const result = await Section.findAll();

  if (!result) return res.status(500).json();
  
  return res.status(200).json(result);
};

const post_section = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const sectionBuilded = Section.build(data);
  const resultValidate = await sectionBuilded
    .validate()
    .catch((err: ValidationError) => err);

  if ((resultValidate as ValidationError).errors)
    res.status(409).json((resultValidate as ValidationError).errors);

  const sectionCreated: any = await sectionBuilded
    .save()
    .catch((err: any) => ({ err }));

  if (sectionCreated.err) res.status(409).json(sectionCreated.err.errors);

  res.status(200).json(sectionCreated);
};

const get_section_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    
    const section = await Section.findByPk(id);
    if (!section) return res.status(404).json("section not found");
    
    return res.status(200).json(section);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const put_section_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const dataPut = req.body;
  const objectDB = await Section.findByPk(id);

  if (!objectDB) return res.status(404).json("object not found");
  else {
    const objectUpdated = await objectDB
      .update(dataPut)
      .catch((err: any) => ({ err }));

    if ((objectUpdated as any).err) {
      const { errors } = (objectUpdated as any).err;
      return res.status(404).json(errors);
    } else return res.status(200).json(objectUpdated);
  }
};

const get_contents_by_section_grouped_by_module = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sectionId = req.params.id;

    // Encuentra la sección e incluye sus módulos
    const section: any = await Section.findByPk(sectionId, {
      include: [
        {
          model: Module,
          through: { attributes: [] },
          include: [
            {
              model: Content,
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    if (!section) return res.status(404).json({ message: "Section not found" });

    // Reorganiza los datos por módulo
    const result = section.dataValues
    console.log("🚀 ~ result:", result)

    return res.status(200).json(result);
  } catch (err) {
    console.error("Error al obtener contenidos agrupados por módulo:", err);
    return res.status(500).json({ message: "Error interno" });
  }
};

const get_modules_by_section = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sectionId = req.params.id;

    const section: any = await Section.findByPk(sectionId, {
      include: [
        {
          model: Module,
          through: { attributes: [] },
          include: [
            {
              model: Content,
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    if (!section) return res.status(404).json({ message: "Section not found" });

    const modules = section.dataValues.modules;
    return res.status(200).json(modules);
  } catch (err) {
    console.error("Error al obtener módulos de la sección:", err);
    return res.status(500).json({ message: "Error interno" });
  }
};


export default {
  get_section_by_id,
  put_section_by_id,
  get_section,
  post_section,
  get_contents_by_section_grouped_by_module,
  get_modules_by_section
};
