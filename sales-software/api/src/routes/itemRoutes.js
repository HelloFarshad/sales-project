import { Router } from 'express';
import { getItems, addItem , deleteItem, editItem} from '../controllers/itemController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Import the authentication middleware

const router = Router();

router.get('/', authenticateToken, getItems);
router.post('/', authenticateToken, addItem);
router.delete('/:id', authenticateToken, deleteItem); // Add delete route
router.put('/:id', authenticateToken, editItem);
export default router;