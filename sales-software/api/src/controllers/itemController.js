// api/src/controllers/itemController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getItems = async (req, res) => {
    const items = await prisma.item.findMany();
    res.json(items);
};

export const addItem = async (req, res) => {
    const { name, description, price, stock, category } = req.body;
    const newItem = await prisma.item.create({
        data: { name, description, price, stock, category },
    });
    res.json(newItem);
};

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        // Ensure `id` is valid and delete the item
        const deletedItem = await prisma.item.delete({
            where: { id: parseInt(id, 10) }, // Convert id to a number
        });
        res.json({ message: 'Item deleted successfully', deletedItem });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting item' });
    }
};

export const editItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category } = req.body;

        // Validate input data (optional but recommended)
     //   if (!name || !description || !price || !stock || !category) {
      //      return res.status(400).json({ error: 'All fields are required' });
    //    }

        // Update the item with the new details
        const updatedItem = await prisma.item.update({
            where: { id: parseInt(id, 10) },
            data: { name, description, price, stock, category },
        });

        // Return a success message with the updated item
        res.json({ message: 'Item updated successfully', updatedItem });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Error updating item' });
    }
};
