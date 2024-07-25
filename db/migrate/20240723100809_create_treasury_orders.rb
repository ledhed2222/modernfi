class CreateTreasuryOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :treasury_orders do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.integer :term, null: false
      t.float :amount, null: false

      t.timestamps
    end
  end
end
