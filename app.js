const { Sequelize, Model, DataTypes, Op } = require('sequelize');

//подключились к базке
const sequelize = new Sequelize('mydb', 'rauferk', '123456', {
  host: 'localhost',
  dialect: 'postgres',
});

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    counter: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'user' }
);

(async () => {
  // сервисная функция для генерации случайных значений
  const rnd = (param) => Math.round(Math.random() * param);
  try {
    console.clear();
    console.log('MAIN START ========>');

    //Синхронизируйем все определенные модели с БД.
    await sequelize.sync();

    // дропаем базку если изменили модели
    // await User.drop();

    //удаляем все записи из базы
    const listD = await User.destroy({ where: {} });

    //создаём новую запись
    await User.create({
      username: 'George',
      birthday: new Date(1980, 6, 20),
      counter: rnd(200),
    });

    // создаём сразу несколько записей
    await User.bulkCreate([
      {
        username: 'Daria',
        birthday: new Date(2000, 6, 20),
        counter: rnd(200),
      },
      {
        username: 'JUIA',
        birthday: new Date(2000, 6, 20),
        counter: rnd(200),
      },
      {
        username: 'Simeon',
        birthday: new Date(1990, 6, 20),
        counter: rnd(200),
      },
      {
        username: 'Artem',
        birthday: new Date(1990, 6, 20),
        counter: rnd(200),
      },
      {
        username: 'Egor',
        birthday: new Date(1990, 6, 20),
        counter: rnd(200),
      },
      {
        username: 'Rauf',
        birthday: new Date(1980, 6, 20),
        counter: rnd(200),
      },
      {
        username: 'another',
        birthday: new Date(1990, 6, 20),
        counter: rnd(200),
      },
    ]);

    // удаляем запись с определёным полем 'another'
    await User.destroy({ where: { username: 'another' } });

    // ищем по имени и изменяем его и записываем
    const rauf = await User.findOne({ where: { username: 'Rauf' } });
    rauf.username += ' Erk';
    await rauf.save();
    console.log(' new Rauf  ===>', rauf.toJSON());

    // увеличиваем всем счётчик на 100 во всех записях
    const listInc = await User.findAll();
    await Promise.all(
      listInc.map((el) => el.increment('counter', { by: 100 }))
    );

    //  апдейтим запись конкретный объект
    await User.update({ counter: 5000 }, { where: { username: 'Artem' } });

    console.log('СОРТИРУЕМ ПО ВОЗРАСТАНИЮ====>');
    const allList = await User.findAll({
      order: [['counter', 'ASC']],
    });
    //выводим в человеской форме
    console.log(allList.map((el) => el.toJSON()));

    console.log('where counter LESS 200 ====>');
    const list = await User.findAll({ where: { counter: { [Op.lt]: 200 } } });
    console.log(list.map((el) => el.toJSON()));

    console.log('all => offset: 2  limit: 2 ====>');
    const find5 = await User.findAll(
      {
        offset: 2,
        limit: 2,
      },
      {
        order: [['counter', 'ASC']],
      }
    );
    console.log(find5.map((el) => el.toJSON()));

    // console.log('JANE===>>>', jane.toJSON());
  } catch (error) {
    console.log('=====error=====>');
    console.log(error);
  } finally {
    //закрываем соединение
    sequelize.close();
  }
})();
