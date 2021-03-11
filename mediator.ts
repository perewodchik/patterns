/*  Реализация паттерна "Посредник"
    Компоненты общаются через интерфейс посредника,
    посылая ему сообщения с помощью метода notify()
*/

interface IMediator
{
    notify(sender: Component, event: string);
}

//Посредник
class Mediator implements IMediator
{
    notify(sender: Component, event: string)
    {
        if(sender instanceof Cat && event === "meow")
        {
            console.log("Cat just meowed. Pet him!");
        } else if(sender instanceof Dog)
        {
            console.log(`Dog wants to eat ${event}!`);
        } else if(sender instanceof Fox)
        {
            console.log("Kurama is finally freed");
        }
        else
        {
            console.log("Unknown event happened");
        }
    }
}

abstract class Component
{
    protected _dialog: IMediator;

    constructor(dialog: IMediator)
    {
        this._dialog = dialog;
    }
}

class Cat extends Component
{
    public makeSound()
    {
        this._dialog.notify(this, "meow");
    }
}

class Dog extends Component
{
    public askForFood(foodType: string)
    {
        this._dialog.notify(this, foodType);
    }
}

class Fox extends Component
{
    public becomeNineTailed()
    {
        this._dialog.notify(this, "becomeNineTailed");
    }
}

//Тесты

const mediator = new Mediator();
const cat = new Cat(mediator);
const dog = new Dog(mediator);
const fox = new Fox(mediator);

cat.makeSound();
dog.askForFood("meat");
fox.becomeNineTailed();