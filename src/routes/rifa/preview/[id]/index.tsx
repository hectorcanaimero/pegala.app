import { component$, useSignal } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { supabase } from '../../../../libs/supabase';

export const useRaffleLoader = routeLoader$(async ({ params }) => {
  const { id } = params;
  const { data, error } = await supabase
    .from('raffles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error fetching rifa:', error.message);
    throw error;
  }
  return data;
});

export const usePaymentLoader = routeLoader$(async ({ params }) => {
  const { id } = params;
  const { data, error } = await supabase
    .from('payment_raffle_options_view')
    .select('id, amount, instructions, currency, payment_name')
    .eq('raffle_id', id)
    .eq('options_status', true);
  if (error) {
    console.error('Error fetching payments:', error.message);
    throw error;
  }
  return data;
});

export default component$(() => {
  const raffle = useRaffleLoader();
  const payments = usePaymentLoader();
  const quantity = useSignal<number>(1);
  const activeTab = useSignal<'pago' | 'datos'>('pago');
  const selectedId = useSignal<number | null>(null);
  const selectedOpt = payments.value.find(opt => String(opt.id) === String(selectedId.value));
  const showModal = useSignal(false);
  // Datos personales (signals controlados)
  return (
    <div class="container my-4">
      <div class="row justify-content-center">
        <div class="col-md-5 col-lg-4">
          <img
            src={raffle.value.banner_url}
            alt={raffle.value.title}
            width="600"
            height="300"
            class="img-fluid rounded border mb-4"
          />
          <h1 class="text-primary mb-4">{raffle.value.title}</h1>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="fw-medium text-secondary">Fecha del sorteo:</span>
            <span class="text-danger fw-bold">25/07/25, 10PM</span>
          </div>
          <p class="fw-semibold">Participa en esta rifa y gana:</p>
          <p class="text-secondary">{raffle.value.description}</p>
        </div>
        <div class="col-md-5 col-lg-4">
          <div class="card mb-3">
            <div class="card-body">
              <p class="text-center mb-1">Total a pagar:{" "}</p>
              <h5 class="text-danger text-center fw-bold mb-0">
                {selectedOpt
                  ? `${selectedOpt.currency} ${(quantity.value * selectedOpt.amount).toFixed(2)}`
                  : "Selecciona un método de pago"}
              </h5>
            </div>
          </div>

          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <button
                class={`nav-link ${activeTab.value === 'pago' ? 'active' : ''}`}
                onClick$={() => activeTab.value = 'pago'}
                type="button"
              >
                Pago
              </button>
            </li>
            <li class="nav-item">
              <button
                class={`nav-link ${activeTab.value === 'datos' ? 'active' : ''}`}
                onClick$={() => activeTab.value = 'datos'}
                type="button"
              >
                Datos personales
              </button>
            </li>
          </ul>
          {activeTab.value === 'pago' && (
            <>
              <p class="text-primary fw-semibold">Selecciona el número de boletos a comprar</p>
              <div class="d-flex align-items-center justify-content-center mb-3">
                <button
                  class="btn btn-outline-secondary btn-round"
                  onClick$={() => quantity.value = Math.max(1, quantity.value - 1)}
                  type="button"
                >
                  -
                </button>
                <input
                  type="text"
                  class="form-control mx-2 text-center number-box"
                  value={quantity.value}
                  readOnly
                />
                <button
                  class="btn btn-outline-secondary btn-round"
                  onClick$={() => quantity.value = quantity.value + 1}
                  type="button"
                >
                  +
                </button>
              </div>
              <p class="text-primary fw-semibold">Selecciona un método de pago</p>
              <div class="d-flex flex-column gap-0">
                {payments.value.map((opt) => (
                  <div
                    key={opt.id}
                    class={`card border-primary ${String(selectedId.value) === String(opt.id) ? 'border-3 shadow-sm' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick$={() => selectedId.value = opt.id}>
                    <div class="card-body p-2 d-flex align-items-center">
                      <input
                        type="radio"
                        class="form-check-input me-3"
                        name="payment_option"
                        id={`opt-${opt.id}`}
                        checked={String(selectedId.value) === String(opt.id)}
                        onClick$={() => selectedId.value = opt.id}
                        style={{ width: "1.3em", height: "1.3em" }}
                      />
                      <label for={`opt-${opt.id}`} class="mb-0 w-100" style={{ cursor: "pointer" }}>
                        <div class="text-primary">
                          <strong>{opt.payment_name}</strong>
                          <br />
                          {opt.instructions}
                          <br />
                          {opt.currency} {opt.amount}
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {activeTab.value === 'datos' && (
            <form class="mt-5">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="cedula" class="form-label">Cédula</label>
                  <input type="text" class="form-control" id="cedula" name="cedula" required />
                </div>
                <div class="col-md-6">
                  <label for="telefono" class="form-label">Teléfono Celular</label>
                  <input type="tel" class="form-control" id="telefono" name="telefono" required />
                </div>
                <div class="col-md-6">
                  <label for="nombre" class="form-label">Nombre Completo</label>
                  <input type="text" class="form-control" id="nombre" name="nombre" required />
                </div>
                <div class="col-md-6">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" name="email" required />
                </div>
                <div class="col-md-6">
                  <label for="comprobante" class="form-label">Comprobante de pago</label>
                  <input type="file" class="form-control" id="comprobante" name="comprobante" accept="image/*,application/pdf" required />
                </div>
                <div class="col-md-6">
                  <label for="referencia" class="form-label">Referencia Bancaria</label>
                  <input type="text" class="form-control" id="referencia" name="referencia" required />
                </div>
              </div>
              <button type="submit" class="btn btn-primary mt-4 w-100">Enviar comprobante</button>
            </form>
          )}
        </div>
      </div>
      {showModal.value && (
        <div class="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Atención</h5>
                <button type="button" class="btn-close" aria-label="Close" onClick$={() => showModal.value = false}></button>
              </div>
              <div class="modal-body">
                <p>Por favor, selecciona un método de pago antes de ingresar tus datos personales.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" onClick$={() => showModal.value = false}>Entendido</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
