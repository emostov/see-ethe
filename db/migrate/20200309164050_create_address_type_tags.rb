# frozen_string_literal: true

class CreateAddressTypeTags < ActiveRecord::Migration[5.2]
  def change
    create_table :address_type_tags do |t|
      t.string :address, null: false
      t.string :type, null: false
      t.string :name
      t.string :data

      t.timestamps
    end
    add_index :address_type_tags, :address
    add_index :address_type_tags, :type
  end
end
