class CreatePaymentStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :payment_statuses do |t|

      t.timestamps
    end
  end
end
