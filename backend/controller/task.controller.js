import Task from '../modelli/task.modelli.js';
export const cercaTask = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Errore nella ricerca delle task' });
  }
}
export const creaTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description, user: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Errore nella creazione task' });
  }
}

export const aggiornaTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, description, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task non trovata' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Errore nella componente aggiorna task' });
  }
}

export const eliminaTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task non trovata' });
    }
    res.json({ message: 'Task eliminata correttamente' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nella componente elimina task' });
  }
}