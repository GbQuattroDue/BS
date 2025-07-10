// Tests for UsertestService.register method

import { UsertestService } from '../../services/userstestService';
import { userstestRepository } from '../../repositories/usertestRepository';
import { hashPassword } from '../../utils/hash';

jest.mock('../../repositories/userstestRepository');
const repo = userstestRepository as jest.Mocked<typeof userstestRepository>;

describe('UsertestService.register', () => {
  let service: UsertestService;
  beforeEach(() => {
    service = new UsertestService();
    jest.resetAllMocks();
  });

  it('lanza error si email ya existe', async () => {
    repo.findByEmail.mockResolvedValue({} as any);
    await expect(service.register('nombre','apellido', 'e@x.com', 'pwd', 'telefono', 'telefono_alt')).rejects.toMatchObject({ status: 409 });
  });

  it('crea usuario correctamente', async () => {
    repo.findByEmail.mockResolvedValue(null);
    repo.create.mockImplementation((data) =>
      Promise.resolve({ ...data, id: 1, toJSON() { return data; } } as any)
    );
    const user = await service.register('nombre','apellido', 'e@x.com', 'pwd', 'telefono', 'telefono_alt');
    expect(user).toEqual({ nombre: 'nombre', apellido: 'apellido', email: 'e@x.com', password: expect.any(String), telefono: 'telefono', telefono_alt: 'telefono_alt' });
  });
});