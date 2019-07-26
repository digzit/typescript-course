import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/contact';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

interface IContact {
  _id?: string,
  firstName: string,
  lastName: string,
  email: string,
  company: string,
  phone: number
}

export class ContactController {

  public add (req: Request, res: Response) {
    let newContact = new Contact(req.body);
    newContact.save((err, contact: IContact) => {
      if(err){
        res.send(err);
      }
      return res.json(contact);
    });
  }


  public getAll (req: Request, res: Response) {
    Contact.find({}, (err, contact: IContact[]) => {
      if(err){
        res.send(err);
      }
      res.json(contact);
    });
  }

  public getById (req: Request, res: Response) {
    Contact.findById(req.params.contactId, (err, contact: IContact) => {
      if(err){
        res.send(err);
      }
      return res.json(contact);
    });
  }

  public update (req: Request, res: Response) {
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact:IContact) => {
      if(err){
        res.send(err);
      }
      return res.json(contact);
    });
  }

  public delete (req: Request, res: Response)  {
    Contact.remove({ _id: req.params.contactId }, (err, contact) => {
      if(err){
        res.send(err);
      }
      res.json({ succes: true });
    });
  }

}
