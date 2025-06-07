import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Calendar, Users, Hotel, Wallet, Mail, Phone } from 'lucide-react';

export default function CotizadorHotel() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    checkIn: '',
    checkOut: '',
    huespedes: 1,
    habitacion: 'Tangara',
    tarifa: 'normal',
    transporteIn: false,
    transporteOut: false,
  });

  const tarifas = {
    normal: 400000,
    solo: 620000,
    friends: 315000,
    socios: 230000,
    nino: 0.5,
  };

  const checkInDate = new Date(form.checkIn);
  const checkOutDate = new Date(form.checkOut);
  const fechasValidas =
    checkInDate < checkOutDate && !isNaN(checkInDate) && !isNaN(checkOutDate);

  const noches = fechasValidas
    ? (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
    : 0;

  const tarifaBase = Number(tarifas[form.tarifa]) || tarifas.normal;
  const dobles = Math.floor(form.huespedes / 2);
  const solos = form.huespedes % 2;
  const totalBase =
    (dobles * 2 * tarifas.normal + solos * tarifas.solo) * noches;
  const iva =
    ((tarifas.normal - 180000) * 0.19 * dobles * 2 +
      (tarifas.solo - 180000) * 0.19 * solos) *
    noches;
  const consumo = 180000 * form.huespedes * noches * 0.08;
  const transporteIngreso = form.transporteIn ? 60000 * form.huespedes : 0;
  const transporteSalida = form.transporteOut ? 60000 * form.huespedes : 0;
  const transporte = transporteIngreso + transporteSalida;
  const diasEstadia = noches + 1;
  const seguro = 3600 * form.huespedes * diasEstadia;
  const total = totalBase + iva + consumo + transporte + seguro;

  const isFormValid = () =>
    form.nombre &&
    form.apellido &&
    form.correo.includes('@') &&
    form.checkIn &&
    form.checkOut &&
    form.huespedes > 0 &&
    fechasValidas;

  const currency = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });
  const fechaActual = format(new Date(), 'dd/MM/yyyy');

  const mensajeWhatsApp =
    `Cotización Hotel Montés Samaná:%0A%0A` +
    `Nombre: ${form.nombre} ${form.apellido}%0A` +
    `Correo: ${form.correo}%0A` +
    `Teléfono: ${form.telefono}%0A` +
    `Check-in: ${form.checkIn}%0A` +
    `Check-out: ${form.checkOut}%0A` +
    `Huéspedes: ${form.huespedes}%0A` +
    `Tarifa: ${form.tarifa}%0A` +
    `Noches: ${noches || 0}%0A` +
    `Días de estadía: ${diasEstadia}%0A` +
    `Cabañas dobles: ${dobles}%0A` +
    `Cabañas individuales: ${solos}%0A` +
    `Base: ${currency.format(totalBase)}%0A` +
    `IVA: ${currency.format(iva)}%0A` +
    `Consumo: ${currency.format(consumo)}%0A` +
    `Transporte ingreso: ${currency.format(transporteIngreso)}%0A` +
    `Transporte salida: ${currency.format(transporteSalida)}%0A` +
    `Seguro hotelero: ${currency.format(seguro)}%0A` +
    `TOTAL: ${currency.format(total)}`;

  const enlaceWhatsApp = `https://wa.me/?text=${mensajeWhatsApp}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Hotel className="w-5 h-5" /> Hotel Montés Samaná
        </h1>
        <div className="text-sm text-right">
          <p>📞 +57 300 123 4567</p>
          <p>✉️ reservas@montessamana.co</p>
        </div>
      </header>

      <main className="py-6 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Cliente */}
            <Card>
              <CardContent className="space-y-4 pt-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" /> Datos del Cliente
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Nombre</Label>
                    <Input
                      onChange={(e) =>
                        setForm({ ...form, nombre: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Apellido</Label>
                    <Input
                      onChange={(e) =>
                        setForm({ ...form, apellido: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Correo</Label>
                    <Input
                      type="email"
                      onChange={(e) =>
                        setForm({ ...form, correo: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <Input
                      type="tel"
                      onChange={(e) =>
                        setForm({ ...form, telefono: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fechas */}
            <Card>
              <CardContent className="space-y-4 pt-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> Fechas y Ocupación
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Check-in</Label>
                    <Input
                      type="date"
                      onChange={(e) =>
                        setForm({ ...form, checkIn: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Check-out</Label>
                    <Input
                      type="date"
                      onChange={(e) =>
                        setForm({ ...form, checkOut: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Huéspedes</Label>
                    <Input
                      type="number"
                      value={form.huespedes}
                      min={1}
                      onChange={(e) =>
                        setForm({ ...form, huespedes: +e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Tipo de tarifa</Label>
                    <select
                      className="w-full border rounded p-2"
                      onChange={(e) =>
                        setForm({ ...form, tarifa: e.target.value })
                      }
                    >
                      <option value="normal">Normal</option>
                      <option value="friends">Friends & Family</option>
                      <option value="socios">Socios</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Servicios */}
            <Card>
              <CardContent className="space-y-4 pt-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Wallet className="w-5 h-5" /> Servicios Adicionales
                </h2>
                <div className="flex flex-col gap-2">
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setForm({ ...form, transporteIn: e.target.checked })
                      }
                    />{' '}
                    Transporte Ingreso
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setForm({ ...form, transporteOut: e.target.checked })
                      }
                    />{' '}
                    Transporte Salida
                  </label>
                </div>
                <a
                  href={enlaceWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="bg-green-600 text-white w-full"
                    disabled={!isFormValid()}
                  >
                    Enviar por WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white shadow-lg">
              <CardContent className="space-y-2 pt-4">
                <h2 className="text-xl font-semibold text-center mb-2">
                  Resumen de Cotización
                </h2>
                <p>
                  <strong>Fecha de generación:</strong> {fechaActual}
                </p>
                <p>
                  <strong>Cliente:</strong> {form.nombre} {form.apellido}
                </p>
                <p>
                  <strong>Correo:</strong> {form.correo}
                </p>
                <p>
                  <strong>Teléfono:</strong> {form.telefono}
                </p>
                <p>
                  <strong>Check-in:</strong> {form.checkIn}
                </p>
                <p>
                  <strong>Check-out:</strong> {form.checkOut}
                </p>
                <p>
                  <strong>Noches:</strong> {noches || 0}
                </p>
                <p>
                  <strong>Días de estadía:</strong> {diasEstadia}
                </p>
                <p>
                  <strong>Huéspedes:</strong> {form.huespedes}
                </p>
                <p>
                  <strong>Cabañas dobles:</strong> {dobles}
                </p>
                <p>
                  <strong>Cabañas individuales:</strong> {solos}
                </p>
                <hr />
                <p>
                  <strong>Subtotal alojamiento:</strong>{' '}
                  {currency.format(totalBase)}
                </p>
                <p>
                  <strong>IVA (19%):</strong> {currency.format(iva)}
                </p>
                <p>
                  <strong>Imp. al Consumo (8%):</strong>{' '}
                  {currency.format(consumo)}
                </p>
                <p>
                  <strong>Transporte ingreso:</strong>{' '}
                  {form.transporteIn ? currency.format(transporteIngreso) : '-'}
                </p>
                <p>
                  <strong>Transporte salida:</strong>{' '}
                  {form.transporteOut ? currency.format(transporteSalida) : '-'}
                </p>
                <p>
                  <strong>Seguro hotelero:</strong> {currency.format(seguro)}
                </p>
                <p className="text-lg font-bold mt-2 text-green-700">
                  TOTAL: {currency.format(total)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 text-sm mt-6">
        © 2025 Hotel Montés Samaná. Todos los derechos reservados. Km 5 vía
        Samaná, Caldas, Colombia.
      </footer>
    </div>
  );
}
