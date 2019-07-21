import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/contact';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController{

  public add (req: Request, res: Response) {
    let newContact = new Contact(req.body);
    newContact.save((err, contact) => {
      if(err){
        res.send(err);
      }
      res.json(contact);
    });
  }


  public getAll (req: Request, res: Response) {
    Contact.find({}, (err, contact) => {
      if(err){
        res.send(err);
      }
      res.json(contact);
    });
  }

  public getById (req: Request, res: Response) {
    Contact.findById(req.params.contactId, (err, contact) => {
      if(err){
        res.send(err);
      }
      res.json(contact);
    });
  }

  public update (req: Request, res: Response) {
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
      if(err){
        res.send(err);
      }
      res.json(contact);
    });
  }

  public delete (req: Request, res: Response) {
    Contact.remove({ _id: req.params.contactId }, (err, contact) => {
      if(err){
        res.send(err);
      }
      res.json({ message: 'Successfully deleted contact!'});
    });
  }

}
