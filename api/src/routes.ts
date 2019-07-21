import { Request, Response } from 'express';
import { ContactController } from "./controllers/contact";

export class Routes {

  public contactController: ContactController = new ContactController();
  public routes(app): void {

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({message: 'API ready'})
      })

    //REST Contacts
    app.route('/contact').post(this.contactController.add)
    app.route('/contact').get(this.contactController.getAll)
    app.route('/contact/:contactId').get(this.contactController.getById)
    app.route('/contact/:contactId').put(this.contactController.update)
    app.route('/contact/:contactId').delete(this.contactController.delete)
  }
}
